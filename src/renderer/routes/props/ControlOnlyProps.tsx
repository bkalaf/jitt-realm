// @flow
import { Result } from "../../hooks/Result";
import { AdjustedIDsGeneral } from '../../hooks/useAdjustNames';
import { AutoComplete } from "../enums/AutoComplete";

export type ControlOnlyProps<T> = {
    name: string;
    display?: string;
    required?: boolean;
    disabled?: boolean;
    stringify: (x: T) => string;
    validators?: Array<<K extends keyof T>(x: K) => Result<T[K]>>;
    autoComplete?: AutoComplete;
    placeholder?: string;
    parse: (x: string) => T;
    readOnly?: boolean; 
};
