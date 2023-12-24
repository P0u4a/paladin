'use client';

import { Switch } from '@/components/ui/switch';
import { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';

type Flag = {
    name: string;
    description: string;
    active: boolean;
};

export default async function Flag({ params }: { params: { id: string } }) {
    const flagId = parseInt(params.id);
    const [flag, setFlag] = useState<Flag>({
        name: '',
        description: '',
        active: false,
    });
    const updateFlag = async () => {
        const res = await fetch('/api/update-flag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flag?.active),
        });

        if (res.status != 200)
            toast.error('Something went wrong. Please try again.');
        else toast.success('Project created successfully!');
    };
    const getFlag = useMemo(
        () => async () => {
            try {
                const response = await fetch('/api/get-flag', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ flagId }),
                });
                const result = await response.json();
                setFlag(result);
            } catch (error) {
                return;
            }
        },
        [flagId]
    );

    useEffect(() => {
        getFlag();
    }, [getFlag]);

    return (
        <section className="flex flex-col gap-4 h-screen">
            <h1>{flag?.name}</h1>
            <p>{flag?.description}</p>
            <div className="flex items-center space-x-2">
                <label>{flag?.active ? 'Enabled' : 'Disabled'}</label>
                <Switch
                    checked={flag?.active}
                    onChange={() =>
                        setFlag((prev) => ({ ...prev, active: !prev.active }))
                    }
                    className={`${flag.active ? 'bg-green-500' : 'bg-input'}`}
                />
            </div>
        </section>
    );
}
