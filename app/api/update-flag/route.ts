import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { flagId, active } = await req.json();

    try {
        await prisma.flag.update({
            data: {
                active,
            },
            where: {
                id: flagId,
            },
        });
        return new NextResponse('Success', { status: 200 });
    } catch (e) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
