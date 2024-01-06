import Image from 'next/image';
import Form from '@/components/form';
import Link from 'next/link';

export default function Login() {
    return (
        <div className="flex pt-20 items-center justify-center">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm">
                        Use your email and password to sign in
                    </p>
                </div>
                <Form type="login" />
            </div>
        </div>
    );
}
