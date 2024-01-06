'use client';

import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRef, useState } from 'react';
import LoadingDots from './loading-dots/loading-dots';
import { validateInput } from '@/lib/validate-input';
import { useRouter } from 'next/navigation';

export default function NewProjectForm() {
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const newProject = async (name: string) => {
        const res = await fetch('/api/new-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(name),
        });

        if (res.status != 200)
            toast.error('Something went wrong. Please try again.');
        else {
            toast.success('Project created successfully!');
            router.refresh();
        }
    };
    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={async (e) => {
                e.preventDefault();
                if (!validateInput(ref.current?.value)) {
                    toast.error('Project name cannot have spaces');
                    return;
                }
                setLoading(true);
                if (ref.current == null) return;
                await newProject(ref.current?.value).then(() =>
                    setLoading(false)
                );
                ref.current.value = '';
            }}
        >
            <label>New Project</label>
            <Input required placeholder="Name" ref={ref} />
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
