import { toSpan } from '../data/auctions/facility/toSpan';
import { useField } from '../../hooks/useField';
import { Indicators } from './Indicators';
import { Span } from './Span';
import { identity } from '../../../common/identity';
import { facilityInitial } from '../data/auctions/facility/index';
import { InputControl } from '.';
import { useControl } from './useControl';
import { ClonedProps } from "./ClonedProps";

export function OutputControl<T extends IRealmDTO, K extends keyof T & string>({
    display,
    name,
    span,
    validators,
    stringify,
    parse,
    readOnly: _readonly,
    required: _required,
    disabled: _disabled,
    setValue,
    getValue,
    subscribe,
    formName,
    feedbacking,
    ...remain
}: {
    name: string;
    validators?: Validator<T>[];
    span: Span;
    stringify?: IStringifyFunction;
    parse?: IParseFunction;
    display?: string;
} & React.ComponentPropsWithoutRef<'input'> &
    ClonedProps) {
    const { props, calculated, displayName, feedback, isShowingFeedback, ref, toID } = useControl<HTMLInputElement>(
        name,
        { _readonly, _disabled, _required, feedbacking },
        { setValue, getValue, subscribe, stringify, parse, formName },
        validators,
        display,
        undefined
    );

    const className = [toSpan(span), 'field'].join(' ');
    return (
        <div id={toID('field')} className={className}>
            {feedbacking && (
                <small id={toID('feedback')} className='feedback'>
                    {feedback}
                </small>
            )}
            <input id={toID('output')} className='calculation' aria-labelledby={toID('output', 'label')} ref={ref} {...remain} {...props} />
            <label id={toID('output', 'label')} htmlFor={toID('output')}>
                {displayName}
                <Indicators isCalculated={calculated} isDisabled={props.disabled} isReadonly={props.readOnly} isRequired={props.required} />
            </label>
        </div>
    );
}

export function TextOutputControl<T, K extends keyof T & string>({ span, ...remain }: React.ComponentPropsWithoutRef<'input'> & { name: string; span: Span }) {
    return <OutputControl span={span} stringify={(x: string) => x} parse={identity} validators={[]} {...remain} />;
}

export function TextInputControl(remain: React.ComponentPropsWithoutRef<'input'> & { display?: string; name: string }) {
    return <InputControl type='text' validators={[]} parse={identity} stringify={identity} {...remain} />;
}
