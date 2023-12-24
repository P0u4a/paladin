import FlagCard from '@/components/flag-card';
import NewFlagForm from '@/components/new-flag';
import prisma from '@/lib/prisma';

export default async function Project({ params }: { params: { id: string } }) {
    const flags = await prisma.flag.findMany({
        where: { projectId: parseInt(params.id) },
    });

    return (
        <section className="flex flex-col justify-center items-center gap-5 h-screen">
            <NewFlagForm />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {flags.map(({ id, name, description, active }) => (
                    <FlagCard
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        active={active}
                    />
                ))}
            </div>
        </section>
    );
}
