import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        await prisma.apiKey.deleteMany({
            where: {
                userEmail: email,
            },
        });

        await prisma.flag.deleteMany({
            where: {
                project: {
                    userEmail: email,
                },
            },
        });

        await prisma.project.deleteMany({
            where: {
                userEmail: email,
            },
        });

        await prisma.user.delete({
            where: {
                email,
            },
        });

        return new Response('Account deleted', { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('account deletion failed', { status: 500 });
    }
}
