import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { id } = await req.json();
    try {
        await prisma.flag.delete({
            where: {
                id,
            },
        });

        return new NextResponse('Success', { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
