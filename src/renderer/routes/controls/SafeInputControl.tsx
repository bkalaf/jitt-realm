/* eslint-disable react/boolean-prop-naming */
import { useRef, useCallback, useMemo, useEffect, useState } from 'react';
import { Result } from '../../hooks/$useControl';
import { wrapTry } from '../data/auctions/lot/wrapTry';
import { FormProps, FormProvidedProps, InsertFormContext, Validator } from '../forms/InsertForm';
import { useInsertForm } from '../forms/useInsertForm';
import { ControlOnlyProps } from './ControlOnlyProps';
import { readAutoComplete, Subscriber } from '@controls/_ControlProps';
import { Indicators } from './Indicators';
import { useControlIDs } from '../../hooks/useControlIDs';
import { useControlThemes } from '../../hooks/useControlThemes';

export function getID(name: string, ...segments: string[]) {
    return [name, ...segments].join('-');
}
export function asText(x: any) {
    return x.toString();
}

export function Input<T>({
    name,
    display,
    setter,
    getter,
    unsubscribe,
    subscribe,
    getErrors,
    stringify,
    realm,
    parse,
    autoComplete,
    calculated,
    feedbacking,
    ...remain
}: {
    name: string;
    display?: string;
    stringify: (x: T) => string;
    parse: (x: string) => T;
    getter: (name: string) => () => T;
    setter: (name: string) => (value: T) => void;
    unsubscribe: () => void;
    subscribe: Subscriber<T>;
    getErrors: (name: string) => string[];
    realm: Realm;
    feedbacking: boolean;
    calculated?: boolean;
} & React.ComponentPropsWithoutRef<'input'>) {
    const classes = useControlThemes();
    const ids = useControlIDs(name, display);
    const ref = useRef<HTMLInputElement>(null);
    const [unsavedValue, setUnsavedValue] = useState<string | undefined>(undefined);
    const value = useMemo(() => {
        if (unsavedValue) return unsavedValue;
        return stringify(getter(name)());
    }, [getter, name, stringify, unsavedValue]);
    const onChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            const tryParse = wrapTry(parse);
            const parsed = tryParse(ev.target.value);
            if (Result.isPass(parsed)) {
                setUnsavedValue(undefined);
                return setter(name)(parsed.value);
            }
            return setUnsavedValue(ev.target.value);
        },
        [name, parse, setter]
    );
    const feedback = useMemo(() => getErrors(name).join('\n'), [getErrors, name]);
    return (
        <div id={ids.container} className={classes.container}>
            <label id={ids.label} className={classes.label} htmlFor={ids.control}>
                {ids.displayName}
                <Indicators isCalculated={calculated ?? false} isReadonly={remain.readOnly} isDisabled={remain.disabled} isRequired={remain.required} />
            </label>
            <input
                id={ids.control}
                className={classes.input}
                autoComplete={readAutoComplete(autoComplete as any)}
                aria-labelledby={ids.label}
                onChange={onChange}
                ref={ref}
                value={value}
                {...remain}
            />
            {feedbacking && (
                <small id={ids.feedback} className={classes.feedback}>
                    {feedback}
                </small>
            )}
        </div>
    );
}

export function Control<T, TElement extends DataEntryElement>({
    children,
    Component,
    ...remain
}: ControlOnlyProps<T> & { Component: React.FunctionComponent<ControlOnlyProps<T> & FormProvidedProps<TElement>>; children?: Children }) {
    const { onSubmit, onReset, onCancel, formID, displayName, ...context } = useInsertForm();
    return (
        <Component {...remain} {...context}>
            {children}
        </Component>
    );
}
export function SafeInputControl<T>({
    name,
    display,
    getter,
    setter,
    subscribe,
    unsubscribe,
    required,
    disabled,
    readOnly,
    stringify,
    validators,
    autoComplete,
    placeholder,
    calculated,
    retrieveErrors,
    realm,
    type,
    parse
}: ControlOnlyProps<T> & FormProvidedProps<HTMLInputElement>) {
    // name: string;
    // display: string;
    // getter: (name: string) => () => T;
    // setter: (name: string) => (ev: React.ChangeEvent<HTMLInputElement>) => void;
    // subscribe: Subscriber<T>;
    // unsubscribe: Unsubscribe;
    // autoComplete?: AutoComplete;
    // required?: boolean;
    // disabled?: boolean;
    // readOnly?: boolean;
    // retrieveErrors: (item: string) => string[];
    // children?: Children;
    // placeholder?: string;
    // calculated?: boolean;
    // realm: Realm;
    // stringify: (x: T) => string;
    // parse: (s: string) => T;
    // validators: Array<(x: T) => Result<T>>;
    // inputType: HTMLInputTypeAttribute;

    const cns = useControlThemes();
    const ref = useRef<HTMLInputElement>(null);
    const [unsavedValue, setUnsavedValue] = useState<string | undefined>(undefined);
    const value = useMemo(() => {
        try {
            return stringify(getter(name)());
        } catch (error) {
            alert(`ERROR on: ${name.toString()}... ${(error as Error).message}`);
            throw error;
        }
    }, [getter, name, stringify]);
    const onChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            return setter(name)(parse(ev.target.value));
        },
        [name, parse, setter]
    );
    const feedback = useMemo(() => {
        return retrieveErrors(name).join('\n');
    }, [name, retrieveErrors]);
    const isUnsaved = useCallback(() => unsavedValue != null && unsavedValue.length > 0, [unsavedValue]);
    const ID = useControlIDs(name, display);
    useEffect(() => {
        subscribe(name, [ref, isUnsaved, validators as Validator<any>[]]);
        return () => unsubscribe(name);
    }, [isUnsaved, name, subscribe, unsubscribe, validators]);
    return (
        <div id={ID.container} className={cns.container}>
            <label id={ID.label} className={cns.label} htmlFor={ID.control}>
                {ID.displayName}
                <Indicators isCalculated={calculated} isReadonly={readOnly} isDisabled={disabled} isRequired={required} />
            </label>
            <input
                id={ID.control}
                className={cns.input}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                autoComplete={readAutoComplete(autoComplete)}
                aria-labelledby={ID.label}
                onChange={onChange}
                ref={ref}
                placeholder={placeholder}
                type={type ?? 'text'}
                value={value}
            />
            <small id={ID.feedback} className={cns.feedback}>
                {feedback}
            </small>
        </div>
    );
}

export function $InputControl<T>({ ...props }: ControlOnlyProps<T>) {
    return <Control Component={SafeInputControl as React.FunctionComponent<ControlOnlyProps<T> & FormProvidedProps<HTMLInputElement>>} {...(props as ControlOnlyProps<T>)} />;
}
