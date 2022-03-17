import { useMemo } from 'react';
import { useControl } from './useControl';
import { ClonedProps } from './ClonedProps';
import { useEmbedded } from '../../hooks/useEmbedded';
import { Indicators } from './Indicators';

export function SelectControl<T extends IRealmDTO>({
    children,
    name,
    stringify,
    parse,
    display,
    validators,
    disabled: _disabled,
    autoComplete,
    required: _required,
    lookup,
    formName,
    setValue,
    getValue,
    subscribe,
    filtered,
    feedbacking,
    optionLabel,
    ...remain
}: {
    children?: Children;
    name: string;
    stringify?: IStringifyFunction;
    parse?: IParseFunction;
    filtered?: string;
    display?: string;
    validators?: Validator2<T>[];
    optionLabel?: (x: any) => string;
    lookup: string | Record<string, string>;
} & React.ComponentPropsWithoutRef<'select'> &
    ClonedProps) {
    const { calculated, displayName, feedback, isShowingFeedback, props, ref, toID } = useControl<HTMLSelectElement>(
        name,
        { _disabled, _readonly: false, _required, feedbacking },
        { formName, setValue, getValue, subscribe, stringify, parse },
        validators,
        display,
        autoComplete
    );
    const { readOnly, ...spread } = props;
    const { realm } = useEmbedded();
    // const displayName = !display ? camelToTitleCase(name) : display;
    // const $disabled = (disabled && !(false ?? false)) ?? false;
    // const $readonly = (false && !(disabled ?? false)) ?? false;
    // const $required = required ?? false;
    // const ariaRequired = $required ? 'true' : 'false';
    // const ariaDisabled = $disabled ? 'true' : disabled ? 'false' : undefined;
    const options = useMemo(
        () =>
            typeof lookup === 'string'
                ? realm
                      .objects<IRealmDTO>(lookup)
                      .filtered(filtered == null ? '_id != null' : filtered)
                      .map((x, ix) => <option key={ix + 1} value={x._id.toHexString()} label={optionLabel ? optionLabel(x) : `key: ${ix}`} />)
                : Object.entries(lookup).map(([k, v], ix) => <option key={ix + 1} value={k} label={v} />),
        [filtered, lookup, optionLabel, realm]
    );
    return (
        <div id={toID('field')} className='field'>
            {feedbacking && (
                <small id={toID('feedback')} className='feedback'>
                    {feedback}
                </small>
            )}
            <select ref={ref} id={toID('dropdown')} className='dropdown' aria-labelledby={toID('dropdown', 'label')} {...remain} {...spread}>
                <option key={0} value='' label='Please choose one...' />
                {options}
            </select>

            <label id={toID('dropdown', 'label')} htmlFor={toID('dropdown')}>
                {displayName}
                <Indicators isCalculated={calculated} isDisabled={props.disabled} isReadonly={props.readOnly} isRequired={props.required} />
            </label>
        </div>
    );
}
