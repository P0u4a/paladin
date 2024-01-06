import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex">
            <div className="flex w-screen flex-col justify-center items-center pt-20">
                <div className="text-center mb-10">
                    <h1 className="text-stone-200 font-bold text-6xl">
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
                    <Link
                        href="/api-keys"
                        className="text-stone-400 underline hover:text-stone-200 transition-all"
                    >
                        API Keys
                    </Link>
                    <p className="text-white">·</p>
                    <Link
                        href="/account"
                        className="text-stone-400 underline hover:text-stone-200 transition-all"
                    >
                        Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
