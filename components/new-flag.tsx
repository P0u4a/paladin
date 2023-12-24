'use client';

import toast from 'react-hot-toast';
import LoadingDots from './loading-dots';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { validateInput } from '@/lib/validate-input';
import { Textarea } from './ui/textarea';

export default function NewFlagForm() {
    const [loading, setLoading] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const params = useParams();
    const projectId = parseInt(params.id);
    const newFlag = async (name: string, description?: string) => {
        const res = await fetch('/api/new-flag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, projectId }),
        });

        if (res.status != 200)
            toast.error('Something went wrong. Please try again.');
        else toast.success('Flag created successfully!');
    };
    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
                e.preventDefault();
                if (!validateInput(nameRef.current?.value)) {
                    toast.error('Flag name cannot have spaces');
                    return;
                }
                setLoading(true);
                if (nameRef.current == null) return;
                newFlag(nameRef.current?.value, descRef.current?.value).then(
                    () => setLoading(false)
                );
                nameRef.current.value = '';
                if (descRef.current) descRef.current.value = '';
            }}
        >
            <h2>New Flag</h2>
            <Input required placeholder="Name" ref={nameRef} />
            <Textarea placeholder="description" ref={descRef} />
            <Button
                type="submit"
                disabled={loading}
                className={`${
                    loading ? 'cursor-not-allowed' : ''
                } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? <LoadingDots color="#808080" /> : <p>Create</p>}
            </Button>
        </form>
    );
}
