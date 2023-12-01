'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            alt="logo"
            className="hidden md:block cursor-pointer"
            height={100}
            onClick={() => router.push('/')}
            src="/images/logo.png"
            width={100}
        />
    );
};

export default Logo;
