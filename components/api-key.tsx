'use client';

import { Input } from './ui/input';
import { Toggle } from './ui/toggle';
import { Button } from './ui/button';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';

type ApiKeyProps = {
    name: string;
    value: string;
};

export default function ApiKey({ name, value }: ApiKeyProps) {
    const [hide, setHide] = useState(true);

    return (
        <div className="flex flex-row gap-2 items-center">
            <label>{name}</label>
            <Input
                className="pointer-events-none max-w-xs"
                readOnly
                type={`${hide ? 'password' : 'text'}`}
                value={value}
            />

            <Toggle
                onPressedChange={(e) => setHide(!e)}
                aria-label="Toggle visibility"
            >
                <Eye className="h-4 w-4" />
            </Toggle>
            <Button
                variant="ghost"
                onClick={() => {
                    navigator.clipboard.writeText(value);
                    toast.success('Copied to clipboard');
                }}
            >
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    );
}
