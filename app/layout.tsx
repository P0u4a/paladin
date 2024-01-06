import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import Login from '@/components/login';
import ClientProvider from '@/components/context/client-provider';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = getServerSession();
    return (
        <html lang="en">
            <ClientProvider session={session}>
                <body className={`${inter.variable} bg-black`}>
                    <Toaster />
                    <Suspense fallback="Loading...">
                        <div className="flex items-center bg-black pt-5">
                            <Link href={'/'} className="float-left pl-20">
                                <Image
                                    src={'/logo.png'}
                                    alt="Home screen logo"
                                    width={52}
                                    height={52}
                                />
                            </Link>
                            <Login className="float-right w-screen pr-20" />
                        </div>
                    </Suspense>
                    <main className="bg-black">{children}</main>
                </body>
            </ClientProvider>
        </html>
    );
}
