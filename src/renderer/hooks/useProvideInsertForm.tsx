import { useCallback } from 'react';
import { SelfStorage } from "../routes/data/auctions/selfStorage/SelfStorage";
import { useNavigate } from 'react-router-dom';
import { useMap } from './useMap';
import { Result } from "./Result";
import { combineResultFirst } from '../../common/Result/combineResult';
import { useDescendOnClick } from './useDescendOnClick';
import { useDialog } from './useDialog';
import React from 'react';
import { useBoolean } from './useBoolean';
import { ObjectId } from '../routes/controls';
import { InsertFormContext } from '../routes/providers/InsertFormCtxt/index';
import { useFormData } from './useFormData';
import { useAdjustNames } from './useAdjustNames';

const combineValidators = (
    [x1, x2, x3]: [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>],
    [y1, y2, y3]: [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>]
) => [x1, x2, [...x3, ...y3]] as [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>];

/**
 * @deprecated
 */
export function useProvideInsertForm<TDto extends IRealmDTO>(initial: () => TDto, type: string, realm: Realm): InsertFormContext<TDto> {
    const navigate = useNavigate();
    const {
        displayName,
        formID,
        headerID,
        buttonsID,
        submitBtn: submitBtnID,
        cancelBtnID,
        resetBtnID,
        label: labelID,
        field: fieldID,
        select: selectID,
        feedback: feedbackID,
        option: optionID,
        input: inputID
    } = useAdjustNames(type);

    const [formData, getter, setter, undo, commit] = useFormData(initial);
    const { upsert: addError, clear: clearErrors, get: getErrors } = useMap<string, string[]>([]);

    const {
        backing: validatorMap,
        add: subscribe,
        remove: unsubscribe,
        get: getValidators
    } = useMap<string, [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>]>([], combineValidators);

    const [feedbacking, showFeedback, hideFeedback] = useBoolean(false);

    const onValidate = useCallback(
        function (name: string): Result<TDto> {
            const [ref, checkUnsaved, validators] = getValidators(name)!;
            if (checkUnsaved()) Result.toFail(`${name} has unsaved data.`);
            if (ref.current == null) {
                return Result.toFail(`${name} has bad ref.`);
            }
            const results = validators.map((f) => f(ref.current?.value)).reduce(combineResultFirst, Result.toPass(formData));

            if (Result.isFail(results)) {
                ref.current.setCustomValidity(results.value.join('\n'));
                addError(name, results.value);
            }
            if (ref.current.validity.valid) {
                return results;
            }
            showFeedback();
            addError(name, [ref.current.validationMessage]);
            return results;
        },
        [getValidators, formData, showFeedback, addError]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validate = useCallback(() => {
        hideFeedback();
        clearErrors();
        const validArray = Array.from(validatorMap.current.keys());
        const result: Result<TDto> = validArray.map(onValidate).reduce(combineResultFirst, Result.toPass(formData));
        if (Result.isFail(result)) {
            showFeedback();
        }
        return result;
    }, [clearErrors, formData, hideFeedback, onValidate, showFeedback, validatorMap]);

    const descend = useDescendOnClick();
    const dialog = useDialog(
        'Do you want to go to item just entered or enter more?',
        'Wut to do?',
        'question',
        'Item Entered',
        'Enter More',
        'Goto Grid'
    )((_id: ObjectId) => navigate(_id.toHexString()), undo, descend);

    const onSubmit = useCallback(() => {
        const isValid = validate();
        try {
            if (Result.isPass(isValid)) {
                realm.write(() => {
                    const _id = realm.create<SelfStorage>(type, isValid.value, Realm.UpdateMode.Modified)._id;
                    dialog(_id).then(commit);
                });
            }
        } catch (error) {
            alert((error as Error).message);
        }
    }, [commit, dialog, realm, type, validate]);

    const retrieveErrors = useCallback(
        (name: string) => {
            return getErrors(name, []) ?? [];
        },
        [getErrors]
    );

    return {
        feedbacking,
        realm,
        retrieveErrors,
        getter,
        setter,
        addError,
        subscribe,
        unsubscribe,
        feedbackID,
        fieldID,
        labelID,
        inputID,
        selectID,
        name: type,
        displayName: displayName ?? '',
        formDisplayName: displayName ?? ''
    };
}
