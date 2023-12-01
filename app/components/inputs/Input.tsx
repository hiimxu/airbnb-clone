'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';
import { cn } from '~/app/libs/utils';

type Props = {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
};

const Input: React.FC<Props> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    className="text-neutral-500 absolute top-5 left-2"
                    size={24}
                />
            )}
            <input
                disabled={disabled}
                id={id}
                {...register(id, { required })}
                className={cn(
                    'peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed',
                    formatPrice ? 'pl-9' : 'pl-4',
                    errors[id]
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-neutral-300 focus:border-black',
                )}
                placeholder=" "
                type={type}
            />
            <label
                className={cn(
                    'absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]',
                    'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
                    formatPrice ? 'left-9' : 'left-4',
                    errors[id] ? 'text-red-500' : 'text-zinc-400',
                )}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};

Input.defaultProps = {
    type: undefined,
    disabled: false,
    formatPrice: false,
    required: false,
};

export default Input;
