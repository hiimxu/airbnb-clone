'use client';

import React from 'react';
import { SafeUser } from '~/app/types';
import useCountries from '~/app/hooks/useCountries';
import Image from 'next/image';
import Heading from '../Heading';
import HeartButton from '../HeartButton';

type Props = {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
};

const ListingHead: React.FC<Props> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <div>
            <Heading
                subtitle={`${location?.region}, ${location?.label}`}
                title={title}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    className="object-cover w-full"
                    fill
                    src={imageSrc}
                />
                <div className="absolute top-5 right-5">
                    <HeartButton currentUser={currentUser} listingId={id} />
                </div>
            </div>
        </div>
    );
};

ListingHead.defaultProps = {
    currentUser: null,
};

export default ListingHead;
