import { useCallback, useEffect, useMemo, useRef } from 'react';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { $useThemeClassNames } from '../../db/SelfStorage';
import React from 'react';
import { ignore } from '../../../common/ignore';
import { Indicator } from '../../db/Indicator';
import { faCalculator, faCircleExclamationCheck, faPenAltSlash, faTextSlash } from '@fortawesome/pro-solid-svg-icons';
import { ControlProps, readAutoComplete } from '@controls/_ControlProps';
import { replaceAll } from '../../../common/text/replaceAll';
import { ObjectId } from 'bson';
import { camelToTitleCase } from '../../../common/text/camelToTitleCase';
import { isEmptyOrNull } from '../data/auctions/lot/asPercentage';

export function SelectControl<T extends { _id: ObjectId; toLookup(): string }>({
    name: $name,
    children,
    disabled,
    display,
    feedbacking,
    getErrors,
    getter,
    map,
    placeholder: $ph,
    required,
    setValue,
    readOnly,
    lookup,
    autoComplete,
    subscribe,
    toOutput,
    realm,
    unsubscribe,
    validators,
    setter,
    icon,
    calculated,
    inputType,
    ...remain
}: ControlProps<any> & { setValue?: (name: string) => (value: any) => void; lookup?: string; map?: Record<string, string> }) {
    const name = replaceAll('.', '-')($name);
    const selectID = `${name}-select-control`;
    const labelID = `${name}-select-control-label`;
    const feedbackID = `${name}-select-control-feedback`;
    const divID = `${name}-select-field`;
    const divCn = $useThemeClassNames('container');
    const labelCn = $useThemeClassNames('label');
    const feedbackCn = $useThemeClassNames('feedback');
    const selectCn = $useThemeClassNames('control');
    const optionCn = 'text-base font-firaSans font-bold bg-blue text-white';
    const placeholder = $ph ? $ph : 'Choose an option...';
    const isCalculated = false;
    const isReadonly = false;
    const isRequired = required ?? false;
    const isDisabled = (disabled || readOnly) ?? false;
    const options = map
        ? Object.entries(map).map(([k, v], ix) => <option className={optionCn} key={ix + 1} value={k} label={v} />)
        : children == null && lookup != null
        ? realm?.objects<T>(lookup).map((x, ix) => <option key={ix} value={x._id.toHexString()} label={x.toLookup()} />)
        : children;
    const value = useMemo(() => (toOutput ? toOutput(getter ? getter($name) : '') : getter ? getter($name) : ''), [toOutput, $name, getter]);
    // const onChange = useMemo(() => (setter ? setter($name as any) : ignore), [$name, setter]);
    const onChange = useCallback(
        (ev: React.ChangeEvent<HTMLSelectElement>) => {
            if (setValue == null) throw new Error('no setter');
            const value = ev.target.value;
            const output = lookup ? (isEmptyOrNull(value) ? undefined : realm?.objectForPrimaryKey<T>(lookup, new ObjectId(value))) : value;
            setValue($name as any)(output);
        },
        [$name, lookup, realm, setValue]
    );
    const ref = useRef<any>(null);
    useEffect(() => {
        if (subscribe != null && unsubscribe != null) {
            subscribe($name, [ref, validators ?? []]);
            return () => unsubscribe($name);
        }
    }, [$name, subscribe, unsubscribe, validators]);
    const feedback = useMemo(() => (getErrors ? getErrors($name)[1] : []).join('\n'), [$name, getErrors]);
    const displayName = display ? display : camelToTitleCase($name);
    return (
        <div id={divID} className={divCn}>
            {feedbacking && (
                <small className={feedbackCn} id={feedbackID}>
                    {feedback}
                </small>
            )}
            <select
                autoComplete={readAutoComplete(autoComplete)}
                required={isRequired}
                disabled={isDisabled}
                id={selectID}
                className={selectCn}
                placeholder={placeholder}
                aria-labelledby={labelID}
                value={value ?? ''}
                ref={ref}
                onChange={onChange}
            >
                <option key={0} label='' value='' className={optionCn} />
                {options}
            </select>
            <label id={labelID} className={labelCn} htmlFor={selectID}>
                {displayName}
                <span className='absolute top-0 right-0 flex flex-row space-x-2'>
                    <Indicator icon={faCalculator} title='Field is calculated.' isFlag={isCalculated} bg='bg-blue' />
                    <Indicator icon={faPenAltSlash} title='Field is read-only.' isFlag={isReadonly} bg='bg-amber' />
                    <Indicator icon={faCircleExclamationCheck} title='Field is required.' isFlag={isRequired} bg='bg-red' />
                    <Indicator icon={faTextSlash} title='Field is disabled.' isFlag={isDisabled} bg='bg-black' />
                </span>
            </label>
        </div>
    );
}
