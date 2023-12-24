import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex h-screen bg-black">
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <Image
                    width={512}
                    height={512}
                    src="/logo.png"
                    alt="Platforms on Vercel"
                    className="w-48 h-48"
                />
                <div className="text-center max-w-screen-sm mb-10">
                    <h1 className="text-stone-200 font-bold text-2xl">
                        Paladin
                    </h1>
                    <p className="text-stone-400 mt-5">
                        Feature Flags as a Service made simple.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Link
                        href="/projects"
                        prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                        className="text-stone-400 underline hover:text-stone-200 transition-all"
                    >
                        Projects
                    </Link>
                    <p className="text-white">·</p>
                    <a
                        href="https://github.com/steven-tey/nextjs-typescript-starter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 underline hover:text-stone-200 transition-all"
                    >
                        GitHub
                    </a>
                    <p className="text-white">·</p>
                    <a
                        href="https://vercel.com/templates/next.js/prisma-postgres-auth-starter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 underline hover:text-stone-200 transition-all"
                    >
                        Docs
                    </a>
                </div>
            </div>
        </div>
    );
}
