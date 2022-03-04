import React from 'react';
import { useForm2 } from '../../hooks/useForm2';
import { IInputRef, useInputRef } from '../../hooks/useInputRef';
import { DbDataType, DbOutputType, BackingFunction, OutputFunction } from './DbFieldValue';
import { IFormContext } from './FormContext';

export type IDbFieldValue<
    TBacking extends DbDataType,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType,
    TElement extends DataEntryElement
> = {
    name: string;
    backing: TBacking | null;
    output: TOutput;
    changing: TChanging;
    isDirty: () => boolean;
    errors: string[];
    isInvalid: boolean;
    toBacking: BackingFunction<TChanging, TBacking>;
    toOutput: OutputFunction<TChanging, TOutput>;
    onChange: (ev: React.ChangeEvent<TElement>) => void;
    onBlur: (ev: React.FocusEvent) => void;
    validators: string[];
    // ref: React.RefObject<DataEntryElement | null>;
    validate: () => void;
    appendErrors: (err: string[]) => void;
    clearErrors: () => void;
    ref: React.RefObject<TElement | null | undefined>;
    undo: () => void;
    fieldID: string;
    controlID: string;
    labelID: string;
    feedbackID: string;
    requiredIndicatorID: string;
    readonlyIndicatorID: string;
    disabledIndicatorID: string;
} & IInputRef<TElement>;

export function useControl2<
    TBacking extends DbDataType,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType,
    TElement extends DataEntryElement
>(
    initial: TChanging,
    $name: string,
    // $changing: TChanging,
    $toBacking: BackingFunction<TChanging, TBacking>,
    $toOutput: OutputFunction<TChanging, TOutput>,
    ...validators: string[]
) {
    const memoized = React.useRef(initial);
    const [errors, setErrors] = React.useState<string[]>([]);
    const appendErrors = React.useCallback(
        (err: string[]) => {
            setErrors((prev) => [...prev, ...err]);
        },
        [setErrors]
    );
    const clearErrors = React.useCallback(() => {
        setErrors([]);
    }, [setErrors]);
    const backing = React.useRef<null | TBacking>($toBacking(initial));
    const [changing, setChanging] = React.useState(initial);
    const convert = React.useCallback(() => {
        clearErrors();
        try {
            backing.current = $toBacking(changing);
        } catch (error) {
            const { message } = error as Error;
            appendErrors([message]);
        }
    }, [clearErrors, $toBacking, changing, appendErrors]);
    const isInvalid = React.useMemo(() => errors.length > 0, [errors]);
    const output = React.useMemo(() => $toOutput(changing), [$toOutput, changing]);
    const isDirty = React.useCallback(() => backing.current !== $toBacking(changing), [$toBacking, changing]);
    const onChange = React.useCallback(
        (ev: React.ChangeEvent<TElement>) => {
            setChanging(ev.target.value as TChanging);
        },
        [setChanging]
    );
    const onBlur = React.useCallback(
        (ev: React.FocusEvent) => {
            convert();
        },
        [convert]
    );
    const onSubmit = React.useCallback(() => {
        memoized.current = changing;
    }, [changing]);
    const { validate, ref, isValid } = useInputRef<TElement, TChanging, TBacking>(validators, setErrors, clearErrors, $toBacking);
    const undo = React.useCallback(() => {
        if (memoized.current !== changing) {
            setChanging(memoized.current);
        }
    }, [changing]);
    const formCtx = useForm2();
    return React.useMemo(
        () => ({
            errors,
            undo,
            name: $name,
            output,
            backing: backing.current,
            toOutput: $toOutput,
            toBacking: $toBacking,
            isInvalid,
            isDirty,
            changing,
            onChange: onChange as any,
            validators,
            onBlur,
            appendErrors,
            clearErrors,
            ref: ref as any,
            validate,
            isValid,
            fieldID: `${$name}-field`,
            controlID: `${$name}-field-control`,
            labelID: `${$name}-field-control-label`,
            feedbackID: `${$name}-field-control-feedback`,
            requiredIndicatorID: `${$name}-field-required-indicator`,
            readonlyIndicatorID: `${$name}-field-readonly-indicator`,
            disabledIndicatorID: `${$name}-field-disabled-indicator`,
            ...formCtx
        }),
        [
            errors,
            undo,
            $name,
            output,
            $toOutput,
            $toBacking,
            $toBacking,
            isInvalid,
            isDirty,
            changing,
            onChange,
            validators,
            onBlur,
            appendErrors,
            clearErrors,
            ref,
            validate,
            isValid,
            formCtx
        ]
    );
}
