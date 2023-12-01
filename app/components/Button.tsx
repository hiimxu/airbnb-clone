'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '../libs/utils';

type Props = {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
};

const Button: React.FC<Props> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
    return (
        <button
            className={cn(
                'relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full',
                outline
                    ? 'bg-white border-black text-black'
                    : 'bg-rose-500 border-rose-500 text-white',
                small
                    ? 'py-1 text-sm font-light border-[1px]'
                    : 'py-3 font-semibold border-2',
            )}
            disabled={disabled}
            onClick={onClick}
            type="button"
        >
            {Icon && <Icon className="absolute left-4 top-3" size={24} />}
            {label}
        </button>
    );
};

Button.defaultProps = {
    disabled: false,
    outline: false,
    small: false,
    icon: undefined,
};

export default Button;
