import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { name, description, projectId } = await req.json();

    if (name === '') return new NextResponse('Name empty', { status: 400 });
    const flagDesc = description ? description : '';

    try {
        await prisma.flag.create({
            data: {
                name,
                description: flagDesc,
                projectId,
                active: false,
            },
        });
        return new NextResponse('Success', { status: 200 });
    } catch (e) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
