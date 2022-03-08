import { useCallback, useRef, useState } from 'react';
import { SelfStorage } from '../data/auctions/selfStorage';
import { useNavigate } from 'react-router-dom';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { useMap } from '../../hooks/useMap';
import { Result } from '../../hooks/$useControl';
import { combineResultFirst } from '../../../common/Result/combineResult';
import { useDescendOnClick } from '../../hooks/useDescendOnClick';
import { useDialog } from '../../hooks/useDialog';
import React from 'react';
import { replaceAll } from '../../../common/text/replaceAll';
import { ObjectId } from '../controls';
import { useBoolean } from './useBoolean';
import { evalSet } from './evalSet';
import { InsertFormContext, evalGet, Validator } from './InsertForm';

export function useProvideInsertForm<TDto extends { _id: ObjectId }>(initial: () => TDto, type: string, realm: Realm): InsertFormContext {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initial);
    const getter = useCallback(
        (name: string) =>
            function <T>(): T {
                return evalGet(formData, name);
            },
        [formData]
    );
    const setter = useCallback(function <T, K extends keyof T>(name: K) {
        return function (value: T[K]) {
            return evalSet(name as any, setFormData, value);
        };
    }, []);
    const { upsert: addError, clear: clearErrors, get: getErrors } = useMap<string, string[]>([]);
    const {
        backing: validatorMap,
        add: subscribe,
        remove: unsubscribe,
        get: getValidators
    } = useMap<string, [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>]>(
        [],
        ([x1, x2, x3]: [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>], [y1, y2, y3]: [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>]) => [
            x1,
            x2,
            [...x3, ...y3]
        ]
    );
    const [feedbacking, showFeedback, hideFeedback] = useBoolean(false);
    const onValidate = useCallback(
        function <T>(name: string): Result<TDto> {
            const [ref, checkUnsaved, validators] = getValidators(name)!;
            if (checkUnsaved()) Result.toFail(`${name} has unsaved data.`);
            if (ref.current == null) return Result.toFail(`${name} has bad ref.`);
            const node = ref.current;
            const results = validators.map((f) => f(node.value)).reduce(combineResultFirst, Result.toPass(formData));
            if (Result.isFail(results)) {
                node.setCustomValidity(results.value.join('\n'));
                addError(name, results.value);
            }
            if (node.validity.valid) {
                return results;
            }
            showFeedback();
            addError(name, [node.validationMessage]);
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
    const memoized = useRef(formData);
    const descend = useDescendOnClick();
    const undo = useCallback(() => {
        setFormData(memoized.current);
    }, []);
    const commit = useCallback(() => {
        memoized.current = formData;
    }, [formData]);
    const formID = `${type}-insert-form`;
    const formDisplay = toTitleCase(replaceAll('-', ' ')(formID));
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
        setter: setter as any,
        onSubmit,
        onReset: undo,
        onCancel: descend,
        formID,
        displayName: formDisplay,
        subscribe,
        unsubscribe
    };
}
