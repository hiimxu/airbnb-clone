'use client';

import React from 'react';
import { CATEGORIES } from '~/app/common/constant';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '~/app/libs/utils';
import Container from '../Container';
import CategoryBox from '../CategoryBox';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className={cn(
                    'pt-4 flex items-center justify-between overflow-x-hidden transition',
                    'hover:overflow-auto',
                )}
            >
                {CATEGORIES?.map((item) => (
                    <CategoryBox
                        icon={item?.icon}
                        key={item?.label}
                        label={item?.label}
                        selected={category === item?.label}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
