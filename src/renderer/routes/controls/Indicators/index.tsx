import React from 'react';
import { Indicator } from '../../../db/Indicator';
import { faCalculator, faCircleExclamationCheck, faPenAltSlash, faTextSlash } from '@fortawesome/pro-solid-svg-icons';

export function Indicators({
    isCalculated,
    isDisabled,
    isRequired,
    isReadonly
}: {
    isCalculated: boolean | undefined;
    isReadonly: boolean | undefined;
    isRequired: boolean | undefined;
    isDisabled: boolean | undefined;
}) {
    return (
        <span className='absolute top-0 right-0 flex flex-row space-x-2'>
            <Indicator icon={faCalculator} title='Field is calculated.' isFlag={isCalculated} bg='bg-blue' />
            <Indicator icon={faPenAltSlash} title='Field is read-only.' isFlag={isReadonly} bg='bg-amber' />
            <Indicator icon={faCircleExclamationCheck} title='Field is required.' isFlag={isRequired} bg='bg-red' />
            <Indicator icon={faTextSlash} title='Field is disabled.' isFlag={isDisabled} bg='bg-black' />
        </span>
    );
}
