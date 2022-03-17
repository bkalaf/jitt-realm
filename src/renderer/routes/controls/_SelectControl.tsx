import { useCallback, useMemo } from 'react';
import React from 'react';
import { ObjectId } from 'bson';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { stringify } from 'querystring';
import { useControl } from '../../hooks/useControl';
import { ControlOnlyProps } from '../props/ControlOnlyProps';
import { readAutoComplete } from '../enums/AutoComplete';
import { toHexString } from '../../util/toHexString';
import { Indicators } from './Indicators';

export function SelectControl<T extends { _id: ObjectId; toLookup(): string }>({
    name: $n,
    disabled,
    display: $d,
    lookup,
    placeholder: $ph,
    readOnly,
    required,
    autoComplete,
    validators,
    children,
    ...spread
}: ControlOnlyProps<any> & { children?: Children; lookup: string | Record<string, string> }) {
    const { inputID, displayName, feedbackID, feedbacking, fieldID, getValue, labelID, retrieveErrors, setValue, fieldsetID, legendID, optionID, outputID, realm, selectID, ref, ...remain } =
        useControl($n, $d, validators ?? ([] as any), stringify as any, parse as any);
    const value = useMemo(() => getValue(), [getValue]);
    const onChange = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => setValue(ev.target.value), [setValue]);
    const feedback = useMemo(() => {
        return retrieveErrors($n).join('\n');
    }, [$n, retrieveErrors]);
    const placeholder = $ph ? $ph : 'Choose an option...';
    // const options = map
    //     ? Object.entries(map).map(([k, v], ix) => <option key={ix + 1} value={k} label={v as any as string} id={optionID($n, ix  + 1)}/>)
    //     : children == null && lookup != null
    //     ? realm?.objects<T>(lookup).map((x, ix) => <option key={ix} value={x._id.toHexString()} label={x.toLookup()} />)
    //     : children;

    const options = useMemo(() => {
        if (typeof lookup === 'string') {
            return realm.objects(lookup).map((x, ix) => <option key={ix + 1} value={toHexString((x as any)._id)} label={(x as any).toLookup()} id={optionID($n, ix + 1)} />);
        } else {
            return Array.from(Object.entries(lookup as Record<string, any>)).map(([k, v], ix) => <option key={0} id={optionID($n, ix + 1)} label={v} value={k} />);
        }
    }, [$n, lookup, optionID, realm]);
    return (
        <div id={fieldID($n)} className='field'>
            {feedbacking && (
                <small className='feedback' id={feedbackID($n)}>
                    {feedback}
                </small>
            )}
            <select
                autoComplete={readAutoComplete(autoComplete)}
                required={required ?? false}
                disabled={disabled ?? false}
                id={selectID($n)}
                placeholder={placeholder}
                aria-labelledby={labelID($n)}
                value={value ?? ''}
                ref={ref as React.RefObject<HTMLSelectElement>}
                onChange={onChange}>
                <option key={0} label='' value='' id={optionID($n, 0)} {...spread} />
                {options}
            </select>
            <label id={labelID($n)} htmlFor={selectID($n)}>
                {displayName}
                <Indicators isCalculated={false} isReadonly={false} isRequired={required ?? false} isDisabled={disabled || readOnly} />
            </label>
        </div>
    );
}
