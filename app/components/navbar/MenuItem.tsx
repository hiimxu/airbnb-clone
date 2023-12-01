import React from 'react';

type Props = {
    onClick: () => void;
    label: string;
};

const MenuItem: React.FC<Props> = ({ label, onClick }) => {
    return (
        <div
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            onClick={onClick}
            role="presentation"
        >
            {label}
        </div>
    );
};

export default MenuItem;
