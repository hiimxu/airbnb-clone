'use client';

import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

declare global {
    // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any, vars-on-top
    var cloudinary: any;
}

type Props = {
    onChange: (value: string) => void;
    value: string;
};

const ImageUpload: React.FC<Props> = ({ value, onChange }) => {
    const handleUpload = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => {
            onChange(result.info.secure_url);
        },
        [onChange],
    );

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            options={{
                maxFiles: 1,
            }}
            uploadPreset={
                process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_UPLOAD_PRESET
            }
        >
            {({ open }) => {
                return (
                    <div
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                        onClick={() => open?.()}
                        role="presentation"
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    alt="upload"
                                    fill
                                    src={value}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
