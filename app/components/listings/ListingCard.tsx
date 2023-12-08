'use client';

import { Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import useCountries from '~/app/hooks/useCountries';
import { SafeListing, SafeUser } from '~/app/types';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

type Props = {
    data: SafeListing;
    currentUser?: SafeUser | null;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
};

const ListingCard: React.FC<Props> = ({
    data,
    currentUser,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }
            onAction?.(actionId || '');
        },
        [disabled, onAction, actionId],
    );

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')} `;
    }, [reservation]);

    return (
        <div
            className="col-span-1 cursor-pointer group"
            onClick={() => router.push(`listings/${data.id}`)}
            role="presentation"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        alt="Listing"
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        fill
                        src={data.imageSrc}
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            currentUser={currentUser}
                            listingId={data.id}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex items-center gap-1">
                    <div className="font-semibold">$ {price}</div>
                    {!reservation && <div className="font-light">night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        label={actionLabel}
                        onClick={handleCancel}
                        small
                    />
                )}
            </div>
        </div>
    );
};

ListingCard.defaultProps = {
    currentUser: null,
    reservation: undefined,
    onAction: undefined,
    disabled: false,
    actionLabel: undefined,
    actionId: undefined,
};

export default ListingCard;
