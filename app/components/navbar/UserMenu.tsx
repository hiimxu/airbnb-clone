'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import useRegisterModal from '~/app/hooks/useRegisterModal';
import useLoginModal from '~/app/hooks/useLoginModal ';
import { signOut } from 'next-auth/react';
import { SafeUser } from '~/app/types';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

type Props = {
    currentUser?: SafeUser | null;
};

const UserMenu: React.FC<Props> = ({ currentUser }) => {
    const { onOpen: onOpenRegisterModal } = useRegisterModal();
    const { onOpen: onOpenLoginModal } = useLoginModal();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={() => {}}
                    role="presentation"
                >
                    Airbnb your home
                </div>
                <div
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                    onClick={toggleOpen}
                    role="presentation"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem label="My trips" onClick={() => {}} />
                                <MenuItem
                                    label="My favorites"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My reservations"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My properties"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Airbnb my home"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={onOpenLoginModal}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={onOpenRegisterModal}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

UserMenu.defaultProps = {
    currentUser: undefined,
};

export default UserMenu;
