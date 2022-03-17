import { AutoComplete, readAutoComplete } from '../enums/AutoComplete';
import { Result } from "../../hooks/Result";
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useEmbedded } from '../../hooks/useEmbedded';
import { replaceAll } from '../../../common/text/replaceAll';
import { isEmptyOrNull } from '../../util/asPercentage';
import { caps } from '../../../common/text/caps';
import { identity } from '../../../common/identity';
import { Booleanish } from "./Booleanish";

export function useMinimalControl(formName: string, name: string, dp?: string) {
    const { prefix } = useEmbedded();
    const fullName = [...prefix, name].join('.');
    const displayName = isEmptyOrNull(dp) ? replaceAll('-', ' ')(name).split(' ').map(caps).join(' ') : dp;
    const toID = useCallback(
        (...suffix: string[]) => {
            return [formName ?? '', name, ...suffix].join('-');
        },
        [formName, name]
    );
    return { fullName, displayName, toID };
}
export function useControl<TElement extends DataEntryElement>(
    name: string,
    { _disabled, _required, _readonly, feedbacking }: { _disabled?: boolean; _required?: boolean; _readonly?: boolean; feedbacking?: boolean } = {},
    {
        formName,
        getValue,
        parse,
        setValue,
        stringify,
        subscribe
    }: {
        setValue?: (name: string, parse: (x: any) => any) => (value: any) => void;
        parse?: (x: any) => any;
        getValue?: (name: string, stringify: (x: any) => string) => () => any;
        stringify?: (x: any) => any;
        subscribe?: (name: string, ref: any, validators: any) => IUnsubscribeFunction;
        formName?: string;
    },
    validators: Array<(x: any) => Result<any>> = [],
    dp?: string,
    autoComplete?: string
) {
    const validatorArray = useMemo(() => [...validators], [validators]);
    const ref = useRef<TElement>(null);
    const { displayName, fullName, toID } = useMinimalControl(formName ?? '', name, dp);    
    const isDisabled = _disabled ?? false;
    const isReadonly = _readonly ?? false;
    const isRequired = _required ?? false;
    const disabled = (isDisabled && !(isReadonly ?? false)) ?? false;
    const readOnly = (isReadonly && !(isDisabled ?? false)) ?? false;
    const required = isRequired ?? false;
    const ariaRequired = required ? 'true' : 'false';
    const ariaDisabled = disabled ? 'true' : isDisabled ? 'false' : undefined;
    const ariaReadOnly = readOnly ? 'true' : isReadonly ? 'false' : undefined;
    const feedback = useCallback(() => ref.current?.validationMessage, []);
    const onChange = useCallback(
        (ev: React.ChangeEvent<TElement>) => {
            if (setValue == null) throw new Error('setValue null');

            setValue(fullName, parse ?? identity)(ev.target.value);
        },
        [fullName, parse, setValue]
    );
    const value = useMemo(() => {
        if (getValue == null) throw new Error('getValue null');

        return getValue(fullName, stringify ?? identity)();
    }, [fullName, getValue, stringify]);
    useEffect(() => {
        console.log('subscribe', fullName, ref, validatorArray);
        if (subscribe == null) throw new Error('subscribe null');

        return subscribe(fullName, ref, validatorArray);
    }, [fullName, ref, subscribe, validatorArray]);
    const calculated = useCallback(() => ref.current?.classList.contains('calculation'), []);
    
    return useMemo(
        () => ({
            displayName,
            calculated: calculated(),
            ref,
            toID,
            props: {
                name: fullName,
                disabled,
                readOnly,
                required,
                'aria-required': ariaRequired as Booleanish,
                'aria-readonly': ariaReadOnly as Booleanish,
                'aria-disabled': ariaDisabled as Booleanish,
                onChange,
                autoComplete: readAutoComplete(autoComplete as AutoComplete),
                value
            },
            feedback: feedback(),
            isShowingFeedback: feedbacking ?? false
        }),
        [ariaDisabled, ariaReadOnly, ariaRequired, autoComplete, calculated, disabled, displayName, feedback, feedbacking, fullName, onChange, readOnly, required, toID, value]
    );
}
