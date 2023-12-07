import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import Button from '../Button';

const SocialLogin = () => {
    return (
        <>
            <Button
                icon={FcGoogle}
                label="Continue with Google"
                onClick={() => signIn('google')}
                outline
            />
            <Button
                icon={AiFillGithub}
                label="Continue with Github"
                onClick={() => signIn('github')}
                outline
            />
        </>
    );
};

export default SocialLogin;
