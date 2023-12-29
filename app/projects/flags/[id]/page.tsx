import FlagControl from '@/components/flag-control';
import prisma from '@/lib/prisma';

export default async function Flag({ params }: { params: { id: string } }) {
    const flagId = parseInt(params.id);
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

    if (!res) return <p>Failed to load flag.</p>;

    return (
        <section className="w-screen flex flex-col gap-4 pt-20 items-center justify-center">
            <h1 className="text-2xl">{res?.name}</h1>
            <p className="text-neutral-400">{res?.description}</p>
            <FlagControl flagId={flagId} init={res.active} />
        </section>
    );
}
