import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthStatus from '@/components/auth-status';
import { Suspense } from 'react';
import SignOut from '@/components/sign-out';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const title = 'Paladin';
const description =
    'A SaaS app that allows developers to create feature flags for their projects in an easy way, with velocity.';

export const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
    themeColor: '#FFF',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <Toaster />
                <Suspense fallback="Loading...">
                    {/* @ts-expect-error Async Server Component */}
                    <AuthStatus />
                    <SignOut />
                </Suspense>
                <main className="bg-black">{children}</main>
            </body>
        </html>
    );
}
