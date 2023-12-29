import { getServerSession } from 'next-auth';
import ApiKey from '@/components/api-key';
import GenerateKey from '@/components/generate-key';
import prisma from '@/lib/prisma';

export default async function ApiKeys() {
    const session = await getServerSession();

    if (!session?.user?.email) return;

    const userEmail = session.user.email;
    const apiKeys = await prisma.apiKey.findMany({
        where: {
            userEmail,
        },
    });

    return (
        <section className="flex flex-col gap-4 pt-20">
            <GenerateKey userEmail={userEmail} />
            <div className="flex justify-center items-center pt-10">
                {apiKeys.map(({ key, name }) => (
                    <ApiKey key={key} value={key} name={name} />
                ))}
            </div>
        </section>
    );
}
