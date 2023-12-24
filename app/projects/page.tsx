import ProjectCard from '@/components/project-card';
import NewProjectForm from '@/components/new-project';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Projects() {
    const session = await getServerSession();
    if (!session?.user?.email) return;
    const projects = await prisma.project.findMany({
        where: { userEmail: session?.user?.email },
    });

    return (
        <>
            <section className="flex flex-col justify-center items-center gap-5 h-screen">
                <NewProjectForm />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {projects.map(({ id, name }) => (
                        <ProjectCard key={id} name={name} id={id} />
                    ))}
                </div>
            </section>
        </>
    );
}
