import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { apiKey, projectName, flagName } = await req.json();

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

    return Response.json({ flag }, { status: 200 });
}
