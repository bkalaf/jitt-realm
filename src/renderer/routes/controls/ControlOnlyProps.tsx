import { HTMLInputTypeAttribute } from 'react';
import { Result } from '../../hooks/$useControl';
import { AutoComplete } from '@controls/_ControlProps';

export type ControlOnlyProps<T> = {
    name: string;
    display?: string;
    readOnly?: boolean;
    required?: boolean;
    disabled?: boolean;
    stringify: (x: T) => string;
    validators: Array<(x: T) => Result<T>>;
    autoComplete?: AutoComplete;
    placeholder?: string;
    calculated?: boolean;
    type: HTMLInputTypeAttribute;
    parse: (x: string) => T;
};
