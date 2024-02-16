import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const projectName = searchParams.get('pname');
    const flagName = searchParams.get('fname');

    if (!projectName || !flagName)
        return new NextResponse('Undefined params', { status: 400 });

    const apiKey = req.headers.get('X-Paladin-Key');

    if (!apiKey) return new NextResponse('Unauthorized', { status: 401 });

    const key = await prisma.apiKey.findUnique({
        where: {
            key: apiKey,
        },
    });

    if (!key) return new NextResponse('Key not found', { status: 401 });

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

    if (!flag) return new NextResponse('Flag not found', { status: 404 });

    const { name, description, active } = flag;

    return NextResponse.json({ name, description, active }, { status: 200 });
}
