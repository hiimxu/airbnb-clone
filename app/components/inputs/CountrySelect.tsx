/* eslint-disable react/jsx-sort-props */
import React from 'react';
import Select from 'react-select';
import useCountries from '~/app/hooks/useCountries';
import { CountrySelectValue } from '~/app/types';

type Props = {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
};

type SelectItemProps = {
    option: CountrySelectValue;
};

const SelectItem: React.FC<SelectItemProps> = ({ option }) => {
    return (
        <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
                {option.label},
                <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
        </div>
    );
};

const CountrySelect: React.FC<Props> = ({ value, onChange }) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#FFE4E6',
                    },
                })}
                // eslint-disable-next-line react/no-unstable-nested-components
                formatOptionLabel={(option) => <SelectItem option={option} />}
                isClearable
                onChange={(v) => onChange(v as CountrySelectValue)}
                options={getAll()}
                placeholder="Anywhere"
                value={value}
            />
        </div>
    );
};

CountrySelect.defaultProps = {
    value: undefined,
};

export default CountrySelect;
