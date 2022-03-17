import React from 'react';
import { identity } from '../../common/identity';
import { $useSubscribe } from './$useSubscribe';
import { useForm } from './useForm';
import { $useControlRef } from './$useControlRef';
import { IFail, Result } from './Result';

/**
 * @deprecated
 */
export function evalValidator<T>(str: string, value: any) {
    const result: Result<T> = eval(str)(value);
    return result;
}
/**
 * @deprecated
 */
export function $useControl<T extends Record<string, any>, U, V extends Record<string, string>>(
    name: string,
    converts: ConversionOrCalculation<T, U, V>,
    saveOnBlur = false,
    ...validators: string[]
): $ControlProps {
    const { createGetterSetter, onSubmit, appendError, subscribeCalculation, unsubscribeCalculation, isFeedbacking, realm, onInput } = useForm();
    const [getter, setter, getFeedback] = React.useMemo(() => createGetterSetter(name), [createGetterSetter, name]);
    const [isComputed, convertFrom, convertTo, calcFunction] = React.useMemo(
        () =>
            typeof converts !== 'function'
                ? [false, converts[0] as (x: T, realm?: Realm) => U, converts[1] as (x: U, realm?: Realm) => T, undefined]
                : // eslint-disable-next-line @typescript-eslint/ban-types
                  ([true, identity, identity, converts] as [boolean, (x: string) => string, (x: string) => string, (a: T, b: V) => U]),
        [converts]
    );
    $useSubscribe<[string, (x: T, y: V) => U]>(subscribeCalculation as any, unsubscribeCalculation as any, name, calcFunction! as (x: T, y: V) => U);
    const [backing, setBacking] = React.useState(convertFrom(getter()));
    const ref = $useControlRef();
    const validate = React.useCallback(
        (conversionError?: string) => {
            if (isComputed) return Result.toPass([name, backing]);
            if (ref.current == null) throw new Error('cannot validate, no ref');
            const results = validators.map((x) => evalValidator(x, backing));
            if (results.some((x) => Result.isFail(x))) {
                const filtered = [...(conversionError == null ? [] : [Result.toFail(conversionError)]), ...results.filter((x) => Result.isFail(x))];
                ref.current.setCustomValidity(filtered.map((x: any) => (x as IFail).value).join('\n'));
            } else {
                ref.current.setCustomValidity(conversionError ?? '');
            }
            const output: Result<[string, string]> = ref.current.validity.valid ? Result.toPass([name, backing] as [string, string]) : Result.toFail(ref.current.validationMessage);
            if (Result.isFail(output)) {
                appendError(name, output.value.join('\n'));
            }
            return output;
        },
        [appendError, backing, isComputed, name, ref, validators]
    );
    const onBlur = React.useCallback(() => {
        if (isComputed) return;
        try {
            const converted = (convertTo as (x: U, realm: Realm) => T)(backing as any, realm);
            setter(converted);
            const validationResult = validate();
            if (Result.isPass(validationResult) && saveOnBlur) {
                onSubmit();
            }
        } catch (error) {
            validate((error as Error).message);
        }
    }, [backing, convertTo, isComputed, onSubmit, realm, saveOnBlur, setter, validate]);
    const onChange = React.useCallback(
        (ev: React.ChangeEvent<DataEntryElement>) => {
            if (!isComputed) {
                setBacking(ev.target.value);
            }
        },
        [isComputed]
    );
    const feedback = React.useMemo(() => getFeedback().join('\n'), [getFeedback]);
    const names = React.useMemo(
        () => ({
            containerID: `${name}-field`,
            controlID: `${name}-control`,
            labelID: `${name}-control-label`,
            feedbackID: `${name}-control-feedback`
        }),
        [name]
    );
    return React.useMemo(
        () =>
            ({
                onChange,
                backing,
                feedback,
                onBlur,
                onInput,
                isFeedbacking,
                ref,
                ...names
            } as $ControlProps),
        [backing, feedback, onInput, isFeedbacking, names, onBlur, onChange, ref]
    );
}
/**
 * @deprecated
 */
export type $ControlProps = {
    onChange: (ev: React.ChangeEvent<DataEntryElement>) => void;
    backing: string;
    feedback: string;
    onInput: () => void;
    onBlur: () => void;
    ref: React.RefObject<DataEntryElement | undefined>;
    feedbackID: string;
    controlID: string;
    labelID: string;
    containerID: string;
    isFeedbacking: boolean;
};
