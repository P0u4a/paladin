'use client';

import { Switch } from './ui/switch';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import toast from 'react-hot-toast';

type ControlProps = {
    init: boolean;
    flagId: number;
};

export default function FlagControl({ init, flagId }: ControlProps) {
    const [active, setActive] = useState(init);
    const debounce = useDebouncedCallback((newState) => {
        setActive(newState);
    }, 500);

    useEffect(() => {
        const updateFlag = async () => {
            const res = await fetch('/api/update-flag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ flagId, active }),
            });

            if (res.status != 200)
                toast.error('Something went wrong. Please try again.');
        };

        updateFlag();
    }, [active, flagId]);

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={active}
                onCheckedChange={(state) => debounce(state)}
                className=" data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input"
            />
            <label>{active ? 'Enabled' : 'Disabled'}</label>
        </div>
    );
}
