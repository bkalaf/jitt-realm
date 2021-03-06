import { RefObject, useEffect, useMemo, useRef } from 'react';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { $useThemeClassNames } from '../../db/SelfStorage';
import { useTheme } from '../../providers/useTheme';
import React from 'react';
import { ignore } from '../../../common/ignore';
import { Indicator } from '../../db/Indicator';
import { faBan, faCalculator, faCircleExclamationCheck, faExchangeAlt, faPenAltSlash, faTextSlash } from '@fortawesome/pro-solid-svg-icons';
import { ControlProps, readAutoComplete } from './ControlProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { replaceAll } from '../../../common/text/replaceAll';
import { camelToTitleCase } from '../../../common/text/camelToTitleCase';

export function InputControl({
    name: $name,
    children,
    getter,
    display,
    subscribe,
    unsubscribe,
    autoComplete,
    icon,
    setter,
    disabled,
    placeholder,
    readOnly,
    required,
    feedbacking,
    getErrors,
    calculated,
    validators,
    inputType,
    toOutput,
    realm,
    setValue,
    ...remain
}: ControlProps<any> & { setValue?: any }) {
    const inputCn = $useThemeClassNames('control');
    const containerCn = $useThemeClassNames('container');
    const labelCn = $useThemeClassNames('label');
    const feedbackCn1 = $useThemeClassNames('feedback');
    const feedbackCn = useTheme({ hidden: !feedbacking, 'inline-flex': feedbacking ?? false }, feedbackCn1);
    const name = replaceAll('.', '-')($name);
    const inputID = `${name}-field-control`;
    const divID = `${name}-field-control`;
    const feedbackID = `${name}-field-control-feedback`;
    const { isReadonly, isRequired, isDisabled, isCalculated } = {
        isReadonly: readOnly || calculated,
        isRequired: required,
        isDisabled: disabled || calculated,
        isCalculated: calculated
    };
    const labelID = `${name}-field-control-label`;
    const value = useMemo(
        () => (toOutput ? toOutput(getter != null ? getter($name) : '') : getter != null ? getter($name) : ''),
        [toOutput, getter, $name]
    );
    const displayName = display ? display : name.includes('-') ? toTitleCase(replaceAll('-', ' ')(name)) : camelToTitleCase(name);
    const onChange = useMemo(() => (setter != null ? setter($name as any) : ignore), [$name, setter]);
    const feedback = useMemo(() => (getErrors != null ? getErrors(name)[1].join('\n') : ''), [getErrors, name]);
    const ref: RefObject<any> = useRef(null);
    useEffect(() => {
        if (subscribe != null && unsubscribe != null) {
            subscribe($name, [ref, validators ?? []]);
            return () => unsubscribe($name);
        }
    }, [$name, subscribe, unsubscribe, validators]);
    const contents = useMemo(
        () =>
            icon == null ? (
                <input
                    name={name}
                    className={inputCn}
                    autoComplete={readAutoComplete(autoComplete)}
                    {...remain}
                    id={inputID}
                    type={inputType ?? 'text'}
                    value={value}
                    onChange={onChange}
                    aria-labelledby={labelID}
                    required={isRequired}
                    readOnly={isReadonly}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    ref={ref}
                />
            ) : (
                <div className='inline-flex' title={value}>
                    <FontAwesomeIcon icon={icon} className='bg-black text-yellow' />
                </div>
            ),
        [
            autoComplete,
            icon,
            inputCn,
            inputID,
            inputType,
            isDisabled,
            isReadonly,
            isRequired,
            labelID,
            name,
            onChange,
            placeholder,
            remain,
            value
        ]
    );
    return (
        <div id={divID} className={containerCn}>
            {feedbacking && (
                <small id={feedbackID} className={feedbackCn}>
                    {feedback}
                </small>
            )}
            {contents}
            <label className={labelCn} id={labelID} htmlFor={inputID}>
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
