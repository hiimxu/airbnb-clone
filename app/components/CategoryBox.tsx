import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { cn } from '../libs/utils';

type Props = {
    icon: IconType;
    label: string;
    selected?: boolean;
};

const CategoryBox: React.FC<Props> = ({ icon: Icon, label, selected }) => {
    const { push } = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedQuery: any = { ...currentQuery, category: label };

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true },
        );

        push(url);
    }, [params, label, push]);

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-2 p-3 border-b-2 transition cursor-pointer',
                'hover:text-neutral-800',
                selected
                    ? 'border-b-neutral-800 text-neutral-800'
                    : 'border-b-transparent text-neutral-500',
            )}
            onClick={handleClick}
            role="presentation"
        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

CategoryBox.defaultProps = {
    selected: undefined,
};

export default CategoryBox;
