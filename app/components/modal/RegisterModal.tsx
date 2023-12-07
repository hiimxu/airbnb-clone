'use client';

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '~/app/hooks/useRegisterModal';
import useLoginModal from '~/app/hooks/useLoginModal ';
import toast from 'react-hot-toast';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import SocialLogin from './SocialLogin';

const RegisterModal = () => {
    const { isOpen, onClose } = useRegisterModal();
    const { onOpen: onOpenLoginModal } = useLoginModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post('api/register', data)
            .then(() => {
                onClose();
            })
            .catch(() => toast.error('Something Went Wrong!'))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const toggle = useCallback(() => {
        onClose();
        onOpenLoginModal();
    }, [onClose, onOpenLoginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                center
                subtitle="Create an account!"
                title="Welcome to Airbnb"
            />
            <Input
                disabled={isLoading}
                errors={errors}
                id="email"
                label="Email"
                register={register}
                required
            />
            <Input
                disabled={isLoading}
                errors={errors}
                id="name"
                label="Name"
                register={register}
                required
            />
            <Input
                disabled={isLoading}
                errors={errors}
                id="password"
                label="Password"
                register={register}
                required
                type="password"
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <SocialLogin />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex items-center justify-center gap-2">
                    <div>Already have an account?</div>
                    <div
                        className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={toggle}
                        role="presentation"
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            actionLabel="Continue"
            body={bodyContent}
            disabled={isLoading}
            footer={footerContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
        />
    );
};

export default RegisterModal;
