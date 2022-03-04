import { useTheme } from '../../providers/useTheme';
import * as React from 'react';
import { Boundary } from '../Boundary';
import { useForm2 } from '../../hooks/useForm2';
import { useControl2 } from './useControl2';
import { identity } from '../../../common/identity';

export function InputElement<T, TElement extends DataEntryElement>({
    name,
    readOnly,
    required,
    disabled
}: {
    name: string;
    readOnly?: boolean;
    required?: boolean;
    disabled?: boolean;
}) {
    const { onChange, output, onBlur } = useControl2('', name, identity, identity);
    return React.createElement('input', {
        id: `${name}-input`,
        name,
        onChange,
        value: output,
        onBlur,
        readOnly: readOnly ?? false,
        required: required ?? false,
        disabled: disabled ?? false
    });
}

export function InputControl<T>({
    name,
    convert,
    labelID,
    getValue,
    readOnly,
    disabled,
    setValue,
    stringify,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    getValue?: GetValue<T>;
    setValue?: SetValue<T, HTMLInputElement>;
    labelID?: string;
    convert?: (x: string) => T;
    stringify?: (x: T) => string;
}) {
    const { onChange, onBlur, output } = useControl2('', name ?? '', identity, identity);
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
        'control'
    );
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <input
                {...props}
                className={className}
                name={name}
                aria-labelledby={labelID}
                onChange={onChange}
                onBlur={onBlur}
                value={output}
                readOnly={readOnly}
                disabled={disabled}
            />
        </Boundary>
    );
}
