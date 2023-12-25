import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const projectName = searchParams.get('pname');
    const flagName = searchParams.get('fname');

    if (!projectName || !flagName)
        return new Response('Undefined params', { status: 400 });

    const apiKey = req.headers.get('X-Paladin-Key');

    if (!apiKey) return new Response('Unauthorized', { status: 401 });

    const key = await prisma.apiKey.findUnique({
        where: {
            key: apiKey,
        },
    });

    if (!key) return new Response('Key not found', { status: 401 });

    const flag = await prisma.flag.findFirst({
        where: {
            name: flagName,
            project: {
                name: projectName,
                user: {
                    apiKeys: {
                        some: {
                            key: apiKey,
                        },
                    },
                },
            },
        },

        select: {
            active: true,
        },
    });

    if (!flag) return new Response('Flag not found', { status: 404 });

    return new Response(JSON.stringify(flag), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
