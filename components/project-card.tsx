import Link from 'next/link';
import { Card, CardTitle, CardHeader } from './ui/card';

type CardProps = {
    id: number;
    name: string;
};

export default function ProjectCard({ id, name }: CardProps) {
    return (
        <Link
            href={`/projects/${id}`}
            className="max-w-xs hover:-translate-y-1 transition-transform ease-linear"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-center items-center">
                        {name}
                    </CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}
