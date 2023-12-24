import { getServerSession } from 'next-auth/next';

export default async function AuthStatus() {
    const session = await getServerSession();
    return (
        <div className="float-left">
            {session && (
                <p className="text-stone-200 text-sm">
                    Signed in as <strong>{session.user?.email}</strong>
                </p>
            )}
        </div>
    );
}
