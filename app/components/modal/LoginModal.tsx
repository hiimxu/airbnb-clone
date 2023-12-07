'use client';

import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useLoginModal from '~/app/hooks/useLoginModal ';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useRegisterModal from '~/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import SocialLogin from './SocialLogin';

const LoginModal = () => {
    const router = useRouter();
    const { isOpen, onClose } = useLoginModal();
    const { onOpen: onOpenRegisterModal } = useRegisterModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const toggle = useCallback(() => {
        onClose();
        onOpenRegisterModal();
    }, [onClose, onOpenRegisterModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                center
                subtitle="Login to your account!"
                title="Welcome to back"
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
                    <div>First time using Airbnb?</div>
                    <div
                        className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={toggle}
                        role="presentation"
                    >
                        Create an account
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
            title="Login"
        />
    );
};

export default LoginModal;
