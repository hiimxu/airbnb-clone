'use client';

import React, { useCallback } from 'react';
import { cn } from '~/app/libs/utils';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IconType } from 'react-icons';

type Props = {
    title: string;
    subTitle: string;
    value: number;
    onChange: (value: number) => void;
};

type ActionButtonProps = {
    icon: IconType;
    onClick: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, onClick }) => {
    return (
        <div
            className={cn(
                'w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer transition',
                'hover:opacity-80',
            )}
            onClick={onClick}
            role="presentation"
        >
            <Icon />
        </div>
    );
};

const Counter: React.FC<Props> = ({ title, subTitle, value, onChange }) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }
        onChange(value - 1);
    }, [value, onChange]);

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-light text-gray-600">{subTitle}</div>
            </div>
            <div className="flex items-center gap-4">
                <ActionButton icon={AiOutlineMinus} onClick={onReduce} />
                <div className="font-light text-xl text-neutral-600">
                    {value}
                </div>
                <ActionButton icon={AiOutlinePlus} onClick={onAdd} />
            </div>
        </div>
    );
};

export default Counter;
