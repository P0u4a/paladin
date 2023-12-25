import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const headerList = headers();
    const apiKey = headerList.get('authorization');

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

    return Response.json(
        { flag },
        { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
}
