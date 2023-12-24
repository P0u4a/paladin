import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const name = await req.json();

    if (name === '') return new NextResponse('Name empty', { status: 400 });

    const session = await getServerSession();
    if (!session?.user?.email) return;

    try {
        await prisma.project.create({
            data: {
                name,
                userEmail: session.user.email,
            },
        });
        return new NextResponse('Success', { status: 200 });
    } catch (e) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
