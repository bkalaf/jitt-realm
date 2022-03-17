/* eslint-disable react/boolean-prop-naming */
import { HTMLInputTypeAttribute } from 'react';
import { AutoComplete } from '../enums/AutoComplete';
export { ObjectId, UUID } from 'bson';
export { ObjectSchema } from 'realm';
export * from './constants';
export * from './Indicators';
export * from './InputControl';
export * from './FieldSetControl';
export * from './SelectControl';
export * from './OutputControl';
export * from './RowHeadCell';
export * from './PrimaryKeyField';

export type FieldControlProps<T> = {
    name: string;
    displayName?: string;
    autoComplete?: AutoComplete;
    required?: boolean;
    disabled?: boolean;
    type: HTMLInputTypeAttribute;
    stringify: IStringifyFunction;
    parse: IParseFunction;
    validators?: Validator<T>[];
    labelID: string;
    inputID: string;
    fieldID: string;
    dropdownID: string;
    optionID: string;
    outputID: string;
    feedbackID: string;
    fieldsetID: string;
    legendID: string;
};
