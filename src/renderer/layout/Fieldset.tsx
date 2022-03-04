import * as React from 'react';
import { cn } from '../util/cn';

export function Fieldset({
    children, computedValue, getValue, setValue, displayName, realm, ...remain
}: {
    children?: Children;
    computedValue: any;
    setValue: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
    getValue: () => any;
    realm: Realm;
    displayName: string;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>) {
    const length = React.Children.toArray(children).length;
    const span = length === 4 ? 2 : length === 3 ? 2 : length < 6 ? 3 : length < 8 ? 3 : 4;
    const className = cn({
        'col-span-2': span === 2,
        'col-span-3': span === 3,
        'col-span-4': span === 4, 
        'grid grid-cols-2': span === 2,
        'grid grid-cols-3': span === 3,
        'grid grid-cols-4': span === 4
    }, 'border-4 border-dotted rounded-md shadow-xl xs:col-span-2 md:col-span-3 xl:col-span-4 border-blue-dark');
    return (
        <fieldset
            className={className}
            {...remain}>
            <legend>{displayName}</legend>
            {children}
        </fieldset>
    );
}
