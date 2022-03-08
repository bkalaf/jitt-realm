import { HTMLInputTypeAttribute, RefObject } from 'react';
import { SelfStorage } from '../data/auctions/selfStorage';
import { Result } from '../../hooks/$useControl';
import React from 'react';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';

export const autoCompleteMap = {
    city: 'address-level2',
    state: 'address-level1',
    country: 'country',
    postalCode: 'postal-code',
    sex: 'sex',
    tel: 'tel',
    street: 'address-line1'
};
export type AutoComplete = keyof typeof autoCompleteMap;

export function readAutoComplete(ac?: AutoComplete) {
    if (ac == null) return undefined;
    if (Object.keys(autoCompleteMap).includes(ac)) return autoCompleteMap[ac]!;
    return ac;
}

export type Subscriber<T> = (name: string, item: [RefObject<DataEntryElement>, ((x: T) => Result<any>)[]]) => void;

export type Unsubscribe = (name: string) => void;

/**
 * @deprecated
 */
export type ControlProps<T> = {
    name: string;
    display?: string;
    feedbacking?: boolean;
    getter?: (x: string) => T;
    setter?: (x: keyof SelfStorage, conversion?: (x: string) => any, valueAs?: 'date' | 'number') => (ev: React.ChangeEvent<DataEntryElement>) => void;
    subscribe?: Subscriber<T>;
    unsubscribe?: Unsubscribe;
    getErrors?: (item: string) => [RefObject<DataEntryElement>, string[]];
    children?: Children;
    autoComplete?: AutoComplete;
    required?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    icon?: IconDefinition;
    disabled?: boolean;
    calculated?: boolean;
    realm?: Realm;
    toOutput?: (x: T) => string;
    toDatabase?: (s: string) => T;
    validators?: Array<(x: T) => Result<T>>;
    inputType?: HTMLInputTypeAttribute;
};
