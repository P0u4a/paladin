'use client';

import { getSession, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import Link from 'next/link';

export default async function SignOut() {
    const session = await getSession();

    return session ? (
        <Button
            variant="outline"
            className="float-right transition-all"
            onClick={() => signOut()}
        >
            Sign out
        </Button>
    ) : (
        <Link href="/login">Sign in</Link>
    );
}
