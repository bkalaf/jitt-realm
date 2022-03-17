// @flow
import React from 'react';
import { AutoComplete } from "../enums/AutoComplete";
import { AdjustedFormIDs } from '../../hooks/useAdjustNames';

export type FormProvidedProps<TElement extends DataEntryElement, T> = {
    feedbacking: boolean;
    realm: Realm;
    setter: ISavedValueSetterFunction<T>;
    getter: IGetterFunction<T>;
    subscribe: <T>(propName: string, value: [React.RefObject<TElement>, () => boolean, Array<Validator<any>>]) => void;
    addError: (name: string, messages: string[]) => void;
    unsubscribe: (name: string) => void;
    retrieveErrors: (name: string) => string[];
    name: string;
    displayName: string;
    fieldID: (s: string) => string;
    inputID:  (s: string) => string;
    labelID:  (s: string) => string;
    feedbackID:  (s: string) => string;
    selectID: (s: string) =>  string;
    // placeholder?: string;
    // autoComplete?: AutoComplete;
};

export type FormUsedProps = {
    onSubmit: () => void;
    onReset: () => void;
    onCancel: () => void;
    ids: AdjustedFormIDs;
}