'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { buttonVariants } from './ui/button';
import {
    Card,
    CardTitle,
    CardHeader,
    CardDescription,
    CardContent,
} from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
type CardProps = {
    id: number;
    name: string;
    description: string;
    active: boolean;
};

export default function FlagCard({ id, name, description, active }: CardProps) {
    const router = useRouter();

    const deleteFlag = async () => {
        const res = await fetch('/api/delete-flag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (res.status !== 200)
            toast.error('Something went wrong. Please try again.');
        else {
            toast.success('Flag deleted successfully.');
            router.refresh();
        }
    };
    return (
        <Card className="max-w-xs">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <Badge
                    className={`${
                        active ? 'bg-green-500' : 'bg-neutral-300'
                    } pointer-events-none max-w-fit`}
                >
                    {active ? 'Enabled' : 'Disabled'}
                </Badge>
            </CardHeader>
            <CardContent className="space-x-4">
                <Link
                    href={`/projects/flags/${id}`}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    Edit
                </Link>
                <Button
                    onClick={deleteFlag}
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-black"
                    variant="outline"
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
}
