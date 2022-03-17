import { useMemo, useCallback } from 'react';
import { useControl } from './useControl';

export function useField<T extends IRealmDTO, TElement extends DataEntryElement>(
    columnName: string,
    stringify: IStringifyFunction,
    parse: IParseFunction,
    incomingDisplayName = '',
    ...validators: Validator2<T>[]
) {
    const { displayName, feedbacking, getValue, retrieveErrors, setValue, realm, ref, fullName, isCalculated, ...remain } = useControl(
        columnName,
        incomingDisplayName,
        validators ?? ([] as any),
        stringify,
        parse
    );
    const { inputID, fieldID, feedbackID, outputID, optionID, selectID, labelID, fieldsetID, legendID } = remain;
    const value = useMemo(() => getValue(), [getValue]);
    const onChange = useCallback((ev: React.ChangeEvent<TElement>) => setValue(ev.target.value), [setValue]);
    const feedback = useMemo(() => {
        return retrieveErrors(columnName).join('\n');
    }, [columnName, retrieveErrors]);
    const calculated = useMemo(() => isCalculated(), [isCalculated]);
    return useMemo(
        () => ({
            value,
            feedback,
            onChange,
            inputID,
            fieldID,
            feedbackID,
            outputID,
            optionID,
            selectID,
            calculated,
            labelID,
            fieldsetID,
            legendID,
            feedbacking,
            fullName,
            realm,
            displayName,
            ref
        }),
        [value, feedback, onChange, inputID, fieldID, feedbackID, outputID, optionID, selectID, calculated, labelID, fieldsetID, legendID, feedbacking, fullName, realm, displayName, ref]
    );
}
