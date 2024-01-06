'use client';

import toast from 'react-hot-toast';
import { Button } from './ui/button';
import LoadingDots from './loading-dots/loading-dots';
import { Copy } from 'lucide-react';
import { useRef, useState } from 'react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type GenerateKeyProps = {
    userEmail: string;
};

export default function GenerateKey({ userEmail }: GenerateKeyProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const generate = async () => {
        const name = inputRef.current?.value;
        setLoading(true);
        const res = await fetch('/api/generate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, name }),
        });

        if (res.status !== 200)
            toast.error('Something went wrong. Please try again.');
        else {
            const { key } = await res.json();
            setApiKey(key);
            setOpen(true);
            router.refresh();
        }

        setLoading(false);
    };
    return (
        <>
            <form
                className="flex flex-col gap-4 justify-center items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    generate();
                }}
            >
                <Button
                    type="submit"
                    disabled={loading}
                    className={`${
                        loading ? 'cursor-not-allowed' : ''
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none max-w-xs`}
                >
                    {loading ? <LoadingDots color="#808080" /> : <p>Create</p>}
                </Button>
                <Input className="max-w-xs" ref={inputRef} placeholder="Name" />
            </form>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="sm:max-w-[425px]"
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Your API Key</DialogTitle>
                        <DialogDescription>
                            Store your API key somewhere safe. You will not be
                            able to see it again.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row gap-2">
                        <Input readOnly value={apiKey} />

                        <Button
                            variant="ghost"
                            onClick={() => {
                                navigator.clipboard.writeText(apiKey);
                                toast.success('Copied to clipboard');
                            }}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button onClick={() => setApiKey('')}>Done</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
