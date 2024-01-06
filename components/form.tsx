'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoadingDots from '@/components/loading-dots/loading-dots';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function Form({ type }: { type: 'login' | 'register' }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                if (type === 'login') {
                    signIn('credentials', {
                        redirect: false,
                        email: e.currentTarget.email.value,
                        password: e.currentTarget.password.value,
                        // @ts-ignore
                    }).then(({ error }) => {
                        if (error) {
                            setLoading(false);
                            toast.error(error);
                        } else {
                            router.refresh();
                            router.push('/projects');
                        }
                    });
                } else {
                    fetch('/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: e.currentTarget.email.value,
                            password: e.currentTarget.password.value,
                        }),
                    }).then(async (res) => {
                        setLoading(false);
                        if (res.status === 200) {
                            toast.success(
                                'Account created! Redirecting to login...'
                            );
                            setTimeout(() => {
                                router.push('/login');
                            }, 2000);
                        } else {
                            const { error } = await res.json();
                            toast.error(error);
                        }
                    });
                }
            }}
            className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
        >
            <div>
                <label htmlFor="email" className="block text-xs uppercase">
                    Email Address
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="a@b.com"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-xs uppercase">
                    Password
                </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
                />
            </div>
            <Button
                disabled={loading}
                className={`${
                    loading ? 'cursor-not-allowed' : ''
                } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    <LoadingDots color="#808080" />
                ) : (
                    <p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
                )}
            </Button>
            {type === 'login' ? (
                <p className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-semibold">
                        Sign up
                    </Link>{' '}
                    for free.
                </p>
            ) : (
                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold">
                        Sign in
                    </Link>{' '}
                    instead.
                </p>
            )}
        </form>
    );
}
