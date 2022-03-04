import React, { useDebugValue } from 'react';
import { DbOutputType } from '../components/forms/DbFieldValue';

export type IInputRef<TElement extends DataEntryElement> = {
    ref: React.RefObject<TElement | null | undefined>;
    isValid: () => boolean;
    validate: () => boolean;
};

export function useInputRef<TElement extends DataEntryElement, TChanging extends DbOutputType, TBacking>(
    validators: string[],
    setErrors: StateSetter<string[]>,
    clearErrors: () => void,
    toBacking: (x: TChanging) => TBacking
): IInputRef<TElement> {
    const ref = React.useRef<TElement | null>();
    const isValid = React.useCallback(() => {
        return ref.current?.validity.valid ?? false;
    }, []);
    const validationMessage = React.useCallback(() => {
        return ref.current?.validationMessage;
    }, []);
    const clearCustomValidity = React.useCallback(() => {
        ref.current?.setCustomValidity('');
    }, []);
    const setCustomValidity = React.useCallback(
        (message: string) => {
            const messages = validationMessage()?.length !== 0 ?? 0 ? [validationMessage()] : [];
            ref.current?.setCustomValidity([...messages, message].join('\n'));
        },
        [validationMessage]
    );
    const validate = React.useCallback(() => {
        clearErrors();
        clearCustomValidity();
        if (!ref.current) {
            setErrors(['inputRef was null.']);
            throw new Error('inputRef was null.');
        }
        const { value, validationMessage } = ref.current;
        const results = validators.map((x) => eval(x)(toBacking(value as TChanging)) as string[]).reduce((pv, cv) => [...pv, ...cv], []);
        setErrors(validationMessage.length > 0 ? [validationMessage, ...results] : []);
        setCustomValidity(results.join('\n'));
        return isValid();
    }, [clearErrors, clearCustomValidity, validators, setErrors, setCustomValidity, isValid, toBacking]);
    useDebugValue({ value: ref.current?.value, validity: ref.current?.validity, validationMessage: ref.current?.validationMessage });
    return {
        ref,
        isValid,
        validate
    };
}
