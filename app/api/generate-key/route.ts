import prisma from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    const key = nanoid();
    const { userEmail, name } = await req.json();
    try {
        await prisma.apiKey.create({
            data: {
                key,
                name,
                userEmail,
            },
        });
        return NextResponse.json({ key }, { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
