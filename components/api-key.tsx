'use client';

import { Input } from './ui/input';
import { Button, buttonVariants } from './ui/button';
import { useState } from 'react';
import LoadingDots from './loading-dots/loading-dots';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type ApiKeyProps = {
    name: string;
};

export default function ApiKey({ name }: ApiKeyProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const revokeApiKey = async (name: string) => {
        setLoading(true);
        const res = await fetch('/api/revoke-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (res.status !== 200) {
            toast.error('Something went wrong. Please try again.');
        } else {
            toast.success('Account deleted');
            router.refresh();
        }

        setLoading(false);
    };
    return (
        <div className="flex flex-row gap-2 items-center">
            <label className="max-w-[10rem]">{name}</label>
            <Input
                className="pointer-events-none max-w-xs"
                readOnly
                type="password"
                value={'................'}
            />

            <Button
                className={cn(buttonVariants({ variant: 'destructive' }))}
                onClick={() => revokeApiKey(name)}
            >
                {loading ? <LoadingDots color="#808080" /> : <p>Revoke</p>}
            </Button>
        </div>
    );
}
