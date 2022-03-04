import React from 'react';
import { identity } from '../../../common/identity';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { useDataList } from '../../hooks/useDataList';
import { useTheme } from '../../providers/useTheme';
import { BackingFunction, DbDataType, DbOutputType, OutputFunction } from './DbFieldValue';
import { IDbFieldValue, useControl2 } from './useControl2';

export type $provinces = 'province-datalist';
export const $provinces: $provinces = 'province-datalist';
export type $countries = 'countries-datalist';
export const $countries: $countries = 'countries-datalist';

export const ControlBase = React.forwardRef(function <
    TChanging extends DbOutputType,
    TOutput extends DbOutputType,
    TBacking extends DbDataType,
    TElement extends DataEntryElement
>(
    props: {
        controlTag?: string;
        labelTag: string;
        feedbackTag?: string;
        containerTag: string;
        initial: () => TChanging;
        name: string;
        displayName?: string;
        toBacking: BackingFunction<TChanging, TBacking>;
        toOutput: OutputFunction<TChanging, TOutput>;
        validators: string[];
        children?: Children;
        required?: boolean;
        readOnly?: boolean;
        type?: React.HTMLInputTypeAttribute
    },
    ref: React.ForwardedRef<TElement | null | undefined>
) {
    // eslint-disable-next-line react/prop-types
    const { controlTag, labelTag, containerTag, feedbackTag, displayName, name, initial, toBacking, toOutput, validators, children } =
        props;
    const {
        appendErrors,
        backing,
        changing,
        clearErrors,
        errors,
        isDirty,
        isInvalid,
        isValid,
        onBlur,
        onChange,
        output,
        undo,
        validate,
        controlID,
        disabledIndicatorID,
        feedbackID,
        fieldID,
        labelID,
        readonlyIndicatorID,
        requiredIndicatorID,
        dirtyControls,
        getDbField,
        getFeedback,
        getOutput,
        onCancel,
        onInput,
        onReset,
        onSubmit,
        register,
        subscribeCalculation,
        updateRegistrar,
        isShowFeedback
    } = useControl2('' as any, name, toBacking, toOutput, ...validators);
    const label = displayName ?? toTitleCase(name);
    const fieldInfo: IDbFieldValue<DbDataType, DbOutputType, DbOutputType, DataEntryElement> = React.useMemo(
        () =>
            ({
                appendErrors: appendErrors,
                backing: backing,
                toBacking: toBacking,
                changing: changing,
                clearErrors,
                controlID,
                fieldID,
                isDirty,
                errors,
                validate,
                ref: ref as any,
                undo,
                isInvalid,
                isValid,
                feedbackID,
                disabledIndicatorID,
                labelID,
                onBlur,
                onChange,
                name,
                output,
                readonlyIndicatorID,
                requiredIndicatorID,
                toOutput: toOutput,
                validators
            } as any),
        [
            toBacking,
            toOutput,
            appendErrors,
            backing,
            changing,
            clearErrors,
            controlID,
            disabledIndicatorID,
            errors,
            feedbackID,
            fieldID,
            isDirty,
            isInvalid,
            isValid,
            labelID,
            name,
            onBlur,
            onChange,
            output,
            readonlyIndicatorID,
            ref,
            requiredIndicatorID,
            undo,
            validate,
            validators
        ]
    );
    const fieldClassName = useTheme(
        {
            flex: true,
            'flex-col': true
        },
        'flex',
        'form',
        'insert',
        'field'
    );
    const labelClassName = useTheme({}, '', 'form', 'insert', 'field', 'label');
    const controlClassName = useTheme({}, '', 'form', 'insert', 'field', 'control');
    const feedbackClassName = useTheme({}, '', 'form', 'insert', 'field', 'feedback');
    const feedback = React.useMemo(() => getFeedback(name)(), [getFeedback, name]);
    console.log('controlTag', controlTag);
    const Control =
        (controlTag ?? '').length > 0 ? (
            React.createElement(controlTag!, { id: controlID, className: controlClassName, onBlur, onChange, ref, value: output }, children)
        ) : (
            <></>
        );
    console.log('labelTag', labelTag);
    const Label = React.createElement(labelTag, { htmlFor: controlID, className: labelClassName, id: labelID }, label);
    console.log('feedbackTag', feedbackTag);
    const Feedback =
        (feedbackTag ?? '').length > 0 ? (
            React.createElement(feedbackTag!, { id: feedbackID, className: feedbackClassName }, feedback)
        ) : (
            <></>
        );
    React.useEffect(() => {
        return register(name, fieldInfo);
    }, [fieldInfo, name, register]);
    console.log('containerTag', containerTag);
    const Container = React.createElement(
        containerTag,
        { id: fieldID, className: fieldClassName },
        Label,
        Control,
        isShowFeedback && Feedback
    );
    return Container;
});

export function SelectBaseElement() {
    return <></>;
}
