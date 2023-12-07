'use client';

import Image from 'next/image';
import React from 'react';

type Props = {
    src?: string | null;
};

const Avatar: React.FC<Props> = ({ src }) => {
    return (
        <Image
            alt="avatar"
            className="rounded-full"
            height={30}
            src={src || '/images/placeholder.jpg'}
            width={30}
        />
    );
};

Avatar.defaultProps = {
    src: undefined,
};

export default Avatar;
