import { useTheme } from '../../providers/useTheme';
import * as React from 'react';
import { identity } from '../../../common/identity';
import { useControl2 } from './useControl2';
import { DbDataType } from './DbFieldValue';

export function SelectControl<T>({
    name,
    convert,
    labelID,
    readOnly,
    disabled,
    children,
    stringify,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
    labelID?: string;
    convert?: (x: string) => string;
    readOnly?: boolean;
    children?: Children;
    stringify: (x: string) => string;
}) {
    const { onBlur, onChange, output } = useControl2<string, string, string, HTMLSelectElement>(
        '',
        name ?? '',
        convert! as (x: string) => string,
        identity as (x: string) => string
    );
    const className = useTheme(
        {
            'select-none': readOnly ?? false,
            'select-all': disabled ?? false,
            'cursor-not-allowed': disabled ?? false
        },
        '',
        'form',
        'insert',
        'field',
        'select'
    );
    return (
        <select
            {...props}
            className={className}
            onBlur={onBlur}
            onChange={onChange}
            value={output}
            disabled={disabled}
            aria-labelledby={labelID}
            data-id={stringify(output)}>
            {children}
        </select>
    );
}
