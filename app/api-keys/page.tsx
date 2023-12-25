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
        <section className="flex flex-col gap-4 h-screen pt-20">
            <GenerateKey userEmail={userEmail} />
            {apiKeys.map(({ key }) => (
                <ApiKey key={key} value={key} />
            ))}
        </section>
    );
}
