'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import LoadingDots from './loading-dots/loading-dots';
import { Card, CardTitle, CardHeader, CardContent } from './ui/card';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CardProps = {
    id: number;
    name: string;
};

export default function ProjectCard({ id, name }: CardProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const deleteProject = async () => {
        setLoading(true);
        const res = await fetch('/api/delete-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        setLoading(false);
        if (res.status !== 200)
            toast.error('Something went wrong. Please try again.');
        else {
            toast.success('Project deleted successfully.');
            router.refresh();
        }
    };
    return (
        <Card className="max-w-xs">
            <CardHeader>
                <CardTitle className="flex justify-center items-center">
                    {name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-x-4">
                <Link
                    href={`/projects/${id}`}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    View
                </Link>
                <Button
                    disabled={loading}
                    onClick={deleteProject}
                    variant="destructive"
                >
                    {loading ? <LoadingDots /> : <p>Delete</p>}
                </Button>
            </CardContent>
        </Card>
    );
}
