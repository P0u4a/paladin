import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import cors from '@/lib/cors';

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(req: NextRequest) {
    return cors(
        req,
        new Response(null, {
            status: 204,
        })
    );
}

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get('Authorization');

    if (!apiKey) return new Response('Unauthorised', { status: 401 });

    const { projectName, flagName } = await req.json();

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
    return cors(
        req,
        new Response(JSON.stringify(flag), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    );
}
