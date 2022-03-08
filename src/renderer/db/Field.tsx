import { useTheme } from '../providers/useTheme';
import { toTitleCase } from '../../common/text/toTitleCase';
import { camelToTitleCase } from '../../common/text/camelToTitleCase';
import { $useControl } from '../hooks/$useControl';
import { ContainerComponent, LabelComponent, ControlComponent, FeedbackComponent, $useThemeClassNames } from './SelfStorage';
import React from 'react';
import { faBan, faPenNibSlash, faShieldBlank } from '@fortawesome/pro-solid-svg-icons';
import { Indicator } from './Indicator';

export function Field<T, U = string>({
    Container,
    Label,
    Control,
    Feedback,
    name,
    converts,
    saveOnBlur,
    display,
    validators,
    containerLabel,
    labelLabel,
    children,
    toOutput,
    required,
    disabled,
    readOnly,
    ...remain
}: {
    Container: ContainerComponent;
    Label: LabelComponent;
    Control?: ControlComponent;
    Feedback?: FeedbackComponent;
    converts: ConversionOrCalculation<T, U>;
    name: string;
    display?: string;
    saveOnBlur?: boolean;
    validators?: string[];
    containerLabel: string;
    labelLabel?: string;
    children?: Children;
    toOutput?: (x: string) => string;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    list?: string;
}) {
    const displayName = React.useMemo(() => (display == null ? camelToTitleCase(name.split('.').reverse()[0]) : display), [display, name]);
    const { backing, containerID, controlID, feedback, feedbackID, labelID, onBlur, onChange, ref, isFeedbacking, onInput } = $useControl(name, converts, saveOnBlur ?? false, ...(validators ?? []));

    const containerCn = $useThemeClassNames(containerLabel);
    const controlCn = $useThemeClassNames('control');
    const labelCn = $useThemeClassNames(labelLabel ?? 'label');
    const feedbackCn = useTheme({ hidden: !isFeedbacking, 'inline-flex': isFeedbacking }, '', 'form', 'insert', 'field', 'feedback');
    React.useDebugValue(`backing: ${JSON.stringify(backing)}\noutput: ${JSON.stringify(toOutput ? toOutput(backing) : backing)}`);
    return (
        <Container id={containerID} className={containerCn}>
            {Feedback && (
                <Feedback id={feedbackID} className={feedbackCn}>
                    {feedback}
                </Feedback>
            )}
            {Control ? (
                <Control
                    ref={ref as any}
                    className={controlCn}
                    id={controlID}
                    onBlur={onBlur}
                    onChange={onChange}
                    onInput={onInput}
                    value={toOutput == null ? backing : toOutput(backing)}
                    aria-labelledby={labelID}
                    aria-errormessage={feedbackID}
                    required={required ?? false}
                    readOnly={readOnly ?? false}
                    disabled={disabled ?? disabled}
                    {...remain}
                >
                    {children}
                </Control>
            ) : (
                children
            )}
            <Label className={labelCn} id={labelID} htmlFor={controlID}>
                {displayName}
            </Label>
            <span className='absolute top-0 right-0 inline-flex space-x-1.5'>
                <Indicator icon={faPenNibSlash} title='Field is read-only.' isFlag={readOnly} />
                <Indicator icon={faShieldBlank} title='Field is NOT optional.' isFlag={required} />
                <Indicator icon={faBan} title='Field is disabled.' isFlag={disabled} />
            </span>
        </Container>
    );
}
