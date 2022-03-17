import { Indicators } from './Indicators';
import { useControl } from './useControl';
import { ClonedProps } from './ClonedProps';

type PassedThruFormProps<T extends IRealmDTO> = {
    children?: Children;
    name: string;
    stringify?: IStringifyFunction;
    parse?: IParseFunction;
    displayName?: string;
    validators?: Validator2<T>[];
} & ClonedProps;

export function InputControl<T extends IRealmDTO>({
    children,
    name,
    stringify,
    parse,
    displayName: dp,
    validators,
    disabled: _disabled,
    readOnly: _readonly,
    autoComplete,
    required: _required,
    feedbacking,
    setValue,
    getValue,
    subscribe,
    formName,
    ...remain
}: PassedThruFormProps<T> & React.ComponentPropsWithoutRef<'input'>) {
    const { toID, props, calculated, ref, feedback, displayName, isShowingFeedback } = useControl<HTMLInputElement>(
        name,
        { _disabled, _required, _readonly, feedbacking },
        { setValue, parse, getValue, subscribe, stringify, formName: formName ?? '' },
        validators,
        dp
    );
    return (
        <div id={toID('field')} className='field'>
            {isShowingFeedback && (
                <small id={toID('feedback')} className='feedback'>
                    {feedback}
                </small>
            )}
            <input ref={ref} id={toID('input')} className='control' aria-labelledby={toID('input', 'label')} {...remain} {...props} />
            <label id={toID('input', 'label')} htmlFor={toID('input')}>
                {displayName}
                <Indicators isCalculated={calculated} isDisabled={props.disabled} isReadonly={props.readOnly} isRequired={props.required} />
            </label>
        </div>
    );
}
