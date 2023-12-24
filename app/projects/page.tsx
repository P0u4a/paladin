import ProjectCard from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

const mock = [
    {
        id: 1,
        name: 'Pbp-Source',
    },
    {
        id: 2,
        name: 'Pbp-Transformer',
    },
    {
        id: 3,
        name: 'Migration-Mapping-Service',
    },
];

export default async function Projects() {
    const { id } = await getSession();
    const projects = await prisma.project.findMany({
        where: { userId: id },
    });

    const newProject = async (name: string) => {
        await prisma.project.create({
            data: {
                name,
                userId: id,
            },
        });
    };

    return (
        <>
            <section className="flex flex-col justify-center items-center gap-5">
                <form className="flex flex-col gap-3">
                    <label>New Project</label>
                    <Input required placeholder="Name" />
                    <Button
                        type="submit"
                        onSubmit={(e) => {
                            newProject(e.default.value);
                        }}
                    >
                        Create
                    </Button>
                </form>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {mock.map(({ name, id }) => (
                        <ProjectCard key={id} name={name} id={id} />
                    ))}
                </div>
            </section>
        </>
    );
}
