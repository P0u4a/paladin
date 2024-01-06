'use client';

import toast from 'react-hot-toast';
import { Button } from './ui/button';
import LoadingDots from './loading-dots/loading-dots';
import { useRef, useState } from 'react';
import { Input } from './ui/input';

type GenerateKeyProps = {
    userEmail: string;
};

export default function GenerateKey({ userEmail }: GenerateKeyProps) {
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const generate = async () => {
        const name = ref.current?.value;
        setLoading(true);
        const res = await fetch('/api/generate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, name }),
        });

        if (res.status !== 200)
            toast.error('Something went wrong. Please try again.');
        else toast.success('API Key generated.');

        setLoading(false);
    };
    return (
        <form
            className="flex flex-col gap-4 justify-center items-center"
            onSubmit={(e) => {
                e.preventDefault();
                generate();
            }}
        >
            <Button
                type="submit"
                disabled={loading}
                className={`${
                    loading ? 'cursor-not-allowed' : ''
                } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none max-w-xs`}
            >
                {loading ? <LoadingDots color="#808080" /> : <p>Create</p>}
            </Button>
            <Input className="max-w-xs" ref={ref} placeholder="Name" />
        </form>
    );
}
