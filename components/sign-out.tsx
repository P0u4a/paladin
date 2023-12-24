'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function SignOut() {
    return (
        <Button
            variant="outline"
            className="float-right transition-all"
            onClick={() => signOut()}
        >
            Sign out
        </Button>
    );
}
