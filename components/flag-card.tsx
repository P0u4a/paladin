import Link from 'next/link';
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
type CardProps = {
    id: number;
    name: string;
    description: string;
    active: boolean;
};

export default function FlagCard({ id, name, description, active }: CardProps) {
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
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-black"
                    variant="outline"
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
}
