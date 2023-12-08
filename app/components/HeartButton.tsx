'use client';

import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../types';
import { cn } from '../libs/utils';
import useFavorite from '../hooks/useFavorite';

type Props = {
    listingId: string;
    currentUser?: SafeUser | null;
};

const HeartButton: React.FC<Props> = ({ listingId, currentUser }) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
    });

    return (
        <div
            className={cn(
                'relative transition cursor-pointer',
                'hover:opacity-80',
            )}
            onClick={toggleFavorite}
            role="presentation"
        >
            <AiOutlineHeart
                className="fill-white absolute -top-[2px] -right-[2px]"
                size={28}
            />
            <AiFillHeart
                className={cn(
                    hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70',
                )}
                size={24}
            />
        </div>
    );
};

HeartButton.defaultProps = {
    currentUser: null,
};

export default HeartButton;
