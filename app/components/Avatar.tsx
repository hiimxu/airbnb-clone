'use client';

import Image from 'next/image';
import React from 'react';

const Avatar = () => {
    return (
        <Image
            alt="avatar"
            className="rounded-full"
            height={30}
            src="/images/placeholder.jpg"
            width={30}
        />
    );
};

export default Avatar;
