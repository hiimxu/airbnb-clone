'use client';

import { Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CATEGORIES } from '~/app/common/constant';
import Container from '~/app/components/Container';
import ListingHead from '~/app/components/listings/ListingHead';
import ListingInfo from '~/app/components/listings/ListingInfo';
import useLoginModal from '~/app/hooks/useLoginModal ';
import { cn } from '~/app/libs/utils';
import { Range } from 'react-date-range';
import { SafeListing, SafeUser } from '~/app/types';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from '~/app/components/listings/ListingReservation';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

type Props = {
    reservation?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
};

const ListingClient: React.FC<Props> = ({
    reservation,
    listing,
    currentUser,
}) => {
    const router = useRouter();
    const { onOpen } = useLoginModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    // eslint-disable-next-line consistent-return
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return onOpen();
        }

        setIsLoading(true);

        axios
            .post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                router.push('/trips');
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [totalPrice, dateRange, listing?.id, router, currentUser, onOpen]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservation?.forEach((item) => {
            const range = eachDayOfInterval({
                start: new Date(item?.startDate),
                end: new Date(item?.endDate),
            });

            dates = [...dates, ...range];
        });
        return dates;
    }, [reservation]);

    const category = useMemo(() => {
        return CATEGORIES.find((item) => item.label === listing.category);
    }, [listing.category, CATEGORIES]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        currentUser={currentUser}
                        id={listing.id}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        title={listing.title}
                    />
                    <div
                        className={cn(
                            'grid grid-cols-1 mt-6',
                            'md:grid-cols-7 md:gap-10',
                        )}
                    >
                        <ListingInfo
                            bathroomCount={listing.bathroomCount}
                            category={category}
                            description={listing.description}
                            guestCount={listing.guestCount}
                            locationValue={listing.locationValue}
                            roomCount={listing.roomCount}
                            user={listing.user}
                        />
                        <div
                            className={cn(
                                'order-first mb-10',
                                'md:order-last md:col-span-3',
                            )}
                        >
                            <ListingReservation
                                dateRange={dateRange}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                                onChangeDate={(value) => setDateRange(value)}
                                onSubmit={onCreateReservation}
                                price={listing.price}
                                totalPrice={totalPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

ListingClient.defaultProps = {
    reservation: [],
    currentUser: null,
};

export default ListingClient;
