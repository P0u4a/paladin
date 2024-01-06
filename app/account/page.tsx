'use client';

import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingDots from '@/components/loading-dots/loading-dots';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Account() {
    const { data } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const email = data?.user?.email ?? '';
    const handleAccountDeletion = async () => {
        setLoading(true);
        const res = await fetch('/api/delete-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (res.status !== 200) {
            toast.error('Something went wrong. Please try again.');
        } else {
            toast.success('Account deleted');
            signOut({ redirect: false });
            router.push('/');
        }

        setLoading(false);
    };
    return (
        <section className="flex flex-col gap-4 pl-20 pt-20">
            <h1>{`Signed in as ${email}`}</h1>
            <Button
                disabled={loading}
                variant="destructive"
                className="max-w-fit"
                onClick={handleAccountDeletion}
            >
                {loading ? <LoadingDots color="#808080" /> : <p>Delete</p>}
            </Button>
        </section>
    );
}
