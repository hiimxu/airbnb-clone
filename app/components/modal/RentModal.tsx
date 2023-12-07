'use client';

import React, { useMemo, useState } from 'react';
import useRentModal from '~/app/hooks/useRentModal';
import { STEPS } from '~/app/common/enum';
import { cn } from '~/app/libs/utils';
import { CATEGORIES } from '~/app/common/constant';
import { FieldValues, useForm } from 'react-hook-form';
import { CountrySelectValue } from '~/app/types';
import dynamic from 'next/dynamic';
import Modal from './Modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';

const RentModal = () => {
    const { isOpen, onClose } = useRentModal();

    const [step, setStep] = useState<number>(STEPS.CATEGORY);

    const {
        // register,
        // handleSubmit,
        setValue,
        watch,
        // formState: { errors },
        // reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(
        () =>
            dynamic(() => import('../Map'), {
                ssr: false,
            }),
        [location],
    );

    const setCustomValue = (
        id: string,
        value: string | CountrySelectValue | number,
    ) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        setStep((prev) => prev - 1);
    };

    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step, STEPS]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step, STEPS]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                subtitle="Pick a category"
                title="Which of these best describes your place?"
            />
            <div
                className={cn(
                    'grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto',
                    'md:grid-cols-2',
                )}
            >
                {CATEGORIES.map((item) => (
                    <div className="col-span-1" key={item.label}>
                        <CategoryInput
                            icon={item.icon}
                            label={item.label}
                            onClick={(value) =>
                                setCustomValue('category', value)
                            }
                            selected={category === item.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    subtitle="Help guests find you!"
                    title="Where is your place located?"
                />
                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    subtitle="What amenitis do you have?"
                    title="Share some basics about your place"
                />
                <Counter
                    onChange={(value) => setCustomValue('guestCount', value)}
                    subTitle="How many guest do you allow?"
                    title="Guests"
                    value={guestCount}
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('roomCount', value)}
                    subTitle="How many rooms do you have?"
                    title="Rooms"
                    value={roomCount}
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    subTitle="How many bathrooms do you have?"
                    title="Bathrooms"
                    value={bathroomCount}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    subtitle="Show guests what your place looks like!"
                    title="Add a photo of your place"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        );
    }

    return (
        <Modal
            actionLabel={actionLabel}
            body={bodyContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onNext}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            title="Airbnb your home"
        />
    );
};

export default RentModal;
