import React from 'react';
import { identity } from '../../../common/identity';
import { $useSubscribe } from '../../hooks/$useSubscribe';
import { useForm } from '../../hooks/useForm';
import { $useControlRef } from '../../hooks/$useControlRef';

export interface IPass<T> {
    kind: 'pass';
    value: T;
}
export interface IFail {
    kind: 'fail';
    value: string[];
}
export type Result<T> = IFail | IPass<T>;
export const Result = {
    isPass<T>(item: Result<T>): item is IPass<T> {
        return item.kind === 'pass';
    },
    isFail<T>(item: Result<T>): item is IFail {
        return item.kind === 'fail';
    },
    toPass<T>(value: T): Result<T> {
        return { kind: 'pass', value };
    },
    toFail<T>(...messages: string[]): Result<T> {
        return { kind: 'fail', value: messages };
    }
};
export function evalValidator<T>(str: string, value: any) {
    const result: Result<T> = eval(str)(value);
    return result;
}

export function $useControl<T, U>(name: string, converts: ConversionOrCalculation<T, U>, saveOnBlur = false, ...validators: string[]): $ControlProps {
    const { createGetterSetter, onSubmit, appendError, subscribeCalculation, unsubscribeCalculation, isFeedbacking, realm } = useForm();
    const [getter, setter, getFeedback] = React.useMemo(() => createGetterSetter(name), [createGetterSetter, name]);
    const [isComputed, convertFrom, convertTo, calcFunction] = Array.isArray(converts)
        ? [false, converts[0] as (x: T, realm?: Realm) => U, converts[1] as (x: U, realm?: Realm) => T, undefined]
        : ([true, identity, identity, converts] as [boolean, (x: string) => string, (x: string) => string, string]);
    $useSubscribe(subscribeCalculation, unsubscribeCalculation, calcFunction);
    const [backing, setBacking] = React.useState(convertFrom(getter()));
    const ref = $useControlRef();
    const validate = React.useCallback(
        (conversionError?: string) => {
            if (isComputed) return Result.toPass([name, backing]);
            if (ref.current == null) throw new Error('cannot validate, no ref');
            const results = validators.map((x) => evalValidator(x, backing));
            if (results.some((x) => Result.isFail(x))) {
                const filtered = [
                    ...(conversionError == null ? [] : [Result.toFail(conversionError)]),
                    ...results.filter((x) => Result.isFail(x))
                ];
                ref.current.setCustomValidity(filtered.map((x: any) => (x as IFail).value).join('\n'));
            } else {
                ref.current.setCustomValidity(conversionError ?? '');
            }
            const output: Result<[string, string]> = ref.current.validity.valid
                ? Result.toPass([name, backing] as [string, string])
                : Result.toFail(ref.current.validationMessage);
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
    const onChange = React.useCallback((ev: React.ChangeEvent<DataEntryElement>) => {
        setBacking(ev.target.value);
    }, []);
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
                isFeedbacking,
                ref,
                ...names
            } as $ControlProps),
        [backing, feedback, isFeedbacking, names, onBlur, onChange, ref]
    );
}

export type $ControlProps = {
    onChange: (ev: React.ChangeEvent<DataEntryElement>) => void;
    backing: string;
    feedback: string;
    onBlur: () => void;
    ref: React.RefObject<DataEntryElement | undefined>;
    feedbackID: string;
    controlID: string;
    labelID: string;
    containerID: string;
    isFeedbacking: boolean;
};
