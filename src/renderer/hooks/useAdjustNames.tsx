import { useContext, useMemo } from 'react';
import { camelToTitleCase } from '../../common/text/camelToTitleCase';
import { caps } from '../../common/text/caps';
import { replaceAll } from '../../common/text/replaceAll';
import { toLower, toTitleCase } from '../../common/text/toTitleCase';
import { EmbeddedContext } from '../routes/providers/EmbeddedContext/index';

export type AdjustedIDsGeneral = {
    displayName: string;
    name: string;
    fullName: string;
};

export type PartialAdjustedIDsField = {
    fieldID: string;
    labelID: string;
    feedbackID: string;
};
export type PartialAdjustedIDsFieldSet = {
    fieldsetID: string;
    legendID: string;
};
export type PartialAdjustedIDsForm = {
    formID: string;
    headerID: string;
    buttonGroupID: string;
    submitBtnID: string;
    cancelBtnID: string;
    resetBtnID: string;
};
export type PartialAdjustedInputIDs = {
    inputID: string;
};
export type PartialAdjustedDropDownIDs = {
    selectID: string;
    optionID: string;
};
export type PartialAdjustedOutputIDs = {
    outputID: string;
};
export type AdjustedFieldIDs = PartialAdjustedIDsField & AdjustedIDsGeneral;
export type AdjustedFieldSetIDs = PartialAdjustedIDsFieldSet & AdjustedIDsGeneral;
export type AdjustedFormIDs = PartialAdjustedIDsForm & AdjustedIDsGeneral;
export type AdjustedInputIDs = PartialAdjustedInputIDs & AdjustedFieldIDs;
export type AdjustedDropDownIDs = PartialAdjustedDropDownIDs & AdjustedFieldIDs;

export function nameAssembler(...preload: string[]) {
    return function (...args: string[]) {
        return [...preload, ...args]
            .map((x) => x.split('-'))
            .reduce((pv, cv) => [...pv, ...cv], [])
            .map(toLower)
            .map(caps)
            .join(' ');
    };
}
function toMysteryForm(x: string) {
    return (s: string) => ['mysetery-form', s, x].join('-');
}
export function useAdjustNames(
    fieldName: string,
    display?: string
): {
    // formDisplayName,
    fullName: string;
    name: string;
    displayName: string | undefined;
    kebabName: string;
    formID: string;
    headerID: string;
    buttonsID: string;
    submitBtn: string;
    resetBtnID: string;
    cancelBtnID: string;
    fieldsetID: string;
    legendID: string;
    field: (x: string) => string;
    input: (x: string) => string;
    label: (x: string) => string;
    feedback: (x: string) => string;
    select: (x: string) => string;
    option: (x: string, ix: number) => string;
    output: (x: string) => string;
} {
    const context = useContext(EmbeddedContext);
    if (!context)
        return {
            fullName: fieldName,
            name: fieldName,
            formID: 'mystery-form',
            buttonsID: 'mystery-form-button-group',
            headerID: 'mystery-form-headers',
            submitBtn: 'mystery-form-submit-btn',
            resetBtnID: 'mystery-form-reset-btn',
            cancelBtnID: 'mystery-form-cancel-btn',
            fieldsetID: 'mystery-form-mystery-type-fieldset',
            legendID: 'mystery-form-mystery-type-fieldset-legend',
            field: toMysteryForm('field'),
            input: toMysteryForm('input'),
            label: toMysteryForm('label'),
            feedback: toMysteryForm('feedback'),
            select: toMysteryForm('select'),
            option: toMysteryForm('option'),
            output: toMysteryForm('output'),
            displayName: camelToTitleCase('mysteryType'),
            kebabName: 'mystery-type'
        };
    const { type, prefix } = context;
    const formDisplayName = display ? display : type.includes('-') ? toTitleCase(replaceAll('-', ' ')(type)) : camelToTitleCase(type);
    const displayName = fieldName ? camelToTitleCase(fieldName) : display;
    const fullName = [...prefix, type].join('.');
    const kebabName = replaceAll('.', '-')(fullName);
    return {
        // formDisplayName,
        fullName,
        name: fieldName,
        displayName,
        kebabName,
        formID: nameAssembler(type, 'insert', 'form')(),
        headerID: nameAssembler(type, 'insert', 'form')('headers'),
        buttonsID: nameAssembler(type, 'insert', 'form')('button', 'group'),
        submitBtn: nameAssembler(type, 'insert', 'form')('submit', 'btn'),
        resetBtnID: nameAssembler(type, 'insert', 'form')('reset', 'btn'),
        cancelBtnID: nameAssembler(type, 'insert', 'form')('cancel', 'btn'),
        fieldsetID: nameAssembler(type, 'insert', 'form')(type, 'fieldset'),
        legendID: nameAssembler(type, 'insert', 'form')(type, 'fieldset', 'legend'),

        field: (x: string) => nameAssembler(type, 'insert', 'form')(x, 'field'),
        input: (x: string) => nameAssembler(type, 'insert', 'form')(x, 'input'),
        label: (x: string) => nameAssembler(type, 'insert', 'form')(x, 'input', 'label'),
        feedback: (x: string) => nameAssembler(type, 'insert', 'form')(x, 'field', 'feedback'),
        select: (x: string) => nameAssembler(type, 'insert', 'form')(x, 'field', 'dropdown'),
        option: (x: string, ix: number) => nameAssembler(type, 'insert', 'form')(x, 'field', 'dropdown', 'option', ix.toString()),
        output: (x: string) => nameAssembler(type, 'insert', 'form')(x, 'output')
    };
}
