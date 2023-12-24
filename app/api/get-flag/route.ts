import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET(req: Request) {
    const flagId = await req.json();
    try {
        const res = await prisma.flag.findUnique({
            where: {
                id: flagId,
            },
            select: {
                name: true,
                description: true,
                active: true,
            },
        });
        if (res === null) return new NextResponse.json({});
        return new NextResponse.json({ res });
    } catch (e) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
