import Link from 'next/link';
import { Card, CardTitle, CardHeader } from './ui/card';

type CardProps = {
    id: number;
    name: string;
};

export default function ProjectCard({ id, name }: CardProps) {
    return (
        <Link href={`/projects/${id}`} className="max-w-xs">
            <Card>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}
