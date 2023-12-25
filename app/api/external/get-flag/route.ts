import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { projectName, flagName } = await req.json();
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

    return NextResponse.json({ flag }, { status: 200 });
}
