import { useCallback, useContext, useMemo, useRef } from 'react';
import { InsertFormCtxt } from '../routes/providers/InsertFormCtxt/index';
import { useAdjustNames } from './useAdjustNames';
import { useValidation } from './useValidation';
import { useUnsavedTracking } from './useUnsavedTracking';
import { EmbeddedContext } from '../routes/providers/EmbeddedContext/index';

/**
 * @deprecated
 */
export function usePrefix(name: string) {
    const { prefix } = useContext(EmbeddedContext)!;
    return [...prefix, name].join('.');
}
/**
 * @deprecated
 */
export function useControl<T extends IRealmDTO, K extends keyof T & string>(
    name: string,
    display: string | undefined,
    validators: Validator2<T>[],
    stringify: IStringifyFunction,
    parse: IParseFunction
) {
    const { subscribe, unsubscribe, getter, setter, addError, ...ctxt } = useContext(InsertFormCtxt)!;
    const { ...ids } = useAdjustNames(name, display);
    const fullName = usePrefix(name);
    const [unsavedValue, setUnsavedValue, clearUnsaved, isUnsaved] = useUnsavedTracking();
    const ref = useValidation<T, K>(isUnsaved, fullName as any, subscribe, unsubscribe, validators);
    const getValue = useMemo(() => getter(fullName as any, stringify , unsavedValue), [fullName, getter, stringify, unsavedValue]);
    const setValue = useMemo(() => {
        return setter(fullName as any, parse, setUnsavedValue as StateSetter<string>, addError);
    }, [addError, fullName, parse, setUnsavedValue, setter]);
    const isCalculated = useCallback(() => (ref.current && ref.current.classList.contains('calculated')) ?? false, [ref]);
    return {
        inputID: ids.input,
        fieldID: ids.field,
        fieldsetID: ids.fieldsetID,
        legendID: ids.legendID,
        labelID: ids.label,
        isCalculated, 
        feedbackID: ids.feedback,
        selectID: ids.select,
        optionID: ids.option,
        outputID: ids.output,
        retrieveErrors: ctxt.retrieveErrors,
        displayName: ids.displayName,
        getValue,
        setValue,
        fullName,
        feedbacking: ctxt.feedbacking,
        realm: ctxt.realm,
        ref
    };
}
