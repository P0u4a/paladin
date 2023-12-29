'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LoginProps = {
    className?: string;
};

export default function Login({ className }: LoginProps) {
    const session = useSession();

    return (
        <div className={className}>
            {session.status === 'authenticated' ? (
                <Button
                    variant="outline"
                    className="float-right transition-all"
                    onClick={() => signOut()}
                >
                    Sign out
                </Button>
            ) : (
                <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: 'default' }))}
                >
                    Sign in
                </Link>
            )}
        </div>
    );
}
