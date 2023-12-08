'use client';

import React from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type Props = {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
};

const Calendar: React.FC<Props> = ({ value, onChange, disabledDates }) => {
    return (
        <DateRange
            date={new Date()}
            direction="vertical"
            disabledDates={disabledDates}
            minDate={new Date()}
            onChange={onChange}
            rangeColors={['#262626']}
            ranges={[value]}
            showDateDisplay={false}
        />
    );
};

Calendar.defaultProps = {
    disabledDates: undefined,
};

export default Calendar;
