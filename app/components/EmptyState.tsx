'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './Heading';
import Button from './Button';

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
};

const EmptyState: React.FC<Props> = ({ title, subtitle, showReset }) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading center subtitle={subtitle} title={title || ''} />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        label="Remove all fillters"
                        onClick={() => router.push('/')}
                        outline
                    />
                )}
            </div>
        </div>
    );
};

EmptyState.defaultProps = {
    title: 'No exact matches',
    subtitle: 'Try changing or removing some of your filters.',
    showReset: false,
};

export default EmptyState;
