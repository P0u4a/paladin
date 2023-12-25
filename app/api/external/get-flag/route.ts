import prisma from '@/lib/prisma';

export async function GET(req: Request) {
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
    });

    if (!flag) return new Response('Flag not found', { status: 404 });

    return Response.json(flag, { status: 200 });
}
