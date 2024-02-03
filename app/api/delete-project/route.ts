import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        await prisma.flag.deleteMany({
            where: {
                projectId: id,
            },
        });

        // Delete the project itself
        await prisma.project.delete({
            where: {
                id,
            },
        });

        return new NextResponse('Success', { status: 200 });
    } catch (err) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
