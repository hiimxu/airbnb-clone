/* eslint-disable max-lines-per-function */

'use client';

import React, { useMemo, useState } from 'react';
import useRentModal from '~/app/hooks/useRentModal';
import { STEPS } from '~/app/common/enum';
import { cn } from '~/app/libs/utils';
import { CATEGORIES } from '~/app/common/constant';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CountrySelectValue } from '~/app/types';
import dynamic from 'next/dynamic';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';

const RentModal = () => {
    const router = useRouter();
    const { isOpen, onClose } = useRentModal();

    const [step, setStep] = useState<number>(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
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

    // eslint-disable-next-line consistent-return
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios
            .post('/api/listings', data)
            .then(() => {
                toast.success('Listing Created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                onClose();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            });
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

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    subtitle="Short and sweet works best!"
                    title="How would you describe your place?"
                />
                <Input
                    disabled={isLoading}
                    errors={errors}
                    id="title"
                    label="Title"
                    register={register}
                    required
                />
                <hr />
                <Input
                    disabled={isLoading}
                    errors={errors}
                    id="description"
                    label="Description"
                    register={register}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    subtitle="How much do you charge per night?"
                    title="Now, set your price"
                />
                <Input
                    disabled={isLoading}
                    errors={errors}
                    formatPrice
                    id="price"
                    label="Price"
                    register={register}
                    required
                    type="number"
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
            onSubmit={handleSubmit(onSubmit)}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryLabel={secondaryActionLabel}
            title="Airbnb your home"
        />
    );
};

export default RentModal;
