import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        await prisma.apiKey.delete({
            where: {
                name,
            },
        });

        return new Response('Success', { status: 200 });
    } catch (err) {
        return new Response('Internal Error', { status: 500 });
    }
}
