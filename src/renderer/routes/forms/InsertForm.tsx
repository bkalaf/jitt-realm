import { RefObject, useCallback, useRef, useState } from 'react';
import { SelfStorage } from '../data/auctions/selfStorage';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { setAssocPath } from '../../../common/obj/setAssocPath';
import { usePreventDefault } from '../../hooks/usePreventDefault';
import { useNavigate } from 'react-router-dom';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { useMap } from '../../hooks/useMap';
import { Result } from '../../hooks/$useControl';
import { combineResult, combineResultFirst } from '../../../common/Result/combineResult';
import { routeNames } from '../constants';
import { ButtonGroup } from '../../components/footer/ButtonGroup';
import { FormButton } from '../../components/footer/FormButton';
import { useGoPreviousOnClick } from '../../hooks/useGoPreviousOnClick';
import { useDescendOnClick } from '../../hooks/useDescendOnClick';
import { useDialog } from '../../hooks/useDialog';
import { ObjectId } from 'bson';
import React from 'react';
import { replaceAll } from '../../../common/text/replaceAll';
import { InputControl } from '../controls/InputControl';

export function InsertForm<T>({ initial, type, realm, children }: { initial: () => T; type: string; realm: Realm; children?: Children }) {
    const navigate = useNavigate();
    const wrapped = useCallback(() => {
        const output = initial();
        console.log('WRAPPED', Object.keys(output), Object.getOwnPropertyNames(output), Object.getOwnPropertyDescriptors(output), output);
        return output;
    }, [initial]);
    const [formData, setFormData] = useState(wrapped);
    const getter = useCallback(
        (name: keyof SelfStorage, toOutput?: (x: any) => any) => {
            return toOutput == null ? getAssocPath(name, formData) : toOutput(getAssocPath(name, formData));
        },
        [formData]
    );

    const setValue = useCallback(
        (name: string) => (value: any) => {
            setFormData((fd: T) => {
                console.log(`fd: `, fd);
                const result = setAssocPath(name, fd, value);
                console.log(`setValue return`, result);
                return result as T;
            });
        },
        []
    );
    const setter = useCallback(
        (name: keyof T) => (ev: React.ChangeEvent<DataEntryElement>) => {
            setValue(name as any)(ev.target.value);
        },
        [setValue]
    );
    const { upsert: addError, clear: clearErrors, get: getErrors } = useMap<string, [RefObject<any>, string[]]>([]);
    const {
        backing: validatorMap,
        add: subscribe,
        remove: unsubscribe,
        get: getValidators
    } = useMap<string, [React.RefObject<DataEntryElement>, Array<(x: any) => Result<any>>]>(
        [],
        (
            [x1, x2]: [React.RefObject<DataEntryElement>, Array<(x: any) => Result<any>>],
            [y1, y2]: [React.RefObject<DataEntryElement>, Array<(x: any) => Result<any>>]
        ) => [x1, [...x2, ...y2]]
    );
    const [feedbacking, setFeedbacking] = useState(false);
    const showFeedback = useCallback(() => setFeedbacking(true), []);
    const hideFeedback = useCallback(() => setFeedbacking(false), []);

    const logError = useCallback(
        (name: string, ref: RefObject<DataEntryElement>, errors: string[]) => {
            addError(name, [ref, errors]);
            ref.current!.setCustomValidity(errors.join('\n'));
        },
        [addError]
    );
    const onValidate = useCallback(
        (name: string) => {
            const [ref, validators] = getValidators(name)!;
            const result = validators.map((f) => f(eval(`formData.${name}`))).reduce(combineResult, Result.toPass(''));
            const errors = Result.isFail(result)
                ? ref.current!.validity.valid
                    ? result.value
                    : [...result.value, ref.current!.validationMessage]
                : ref.current!.validity.valid
                ? []
                : [ref.current!.validationMessage];
            logError(name, ref, errors);
            return result;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getValidators, logError, formData]
    );
    const validate = useCallback(() => {
        hideFeedback();
        clearErrors();
        const validArray = Array.from(validatorMap.current.keys());
        const result: Result<SelfStorage> = validArray.map(onValidate).reduce(combineResultFirst, Result.toPass(formData));
        if (Result.isFail(result)) {
            showFeedback();
        }
        return result;
    }, [clearErrors, formData, hideFeedback, onValidate, showFeedback, validatorMap]);
    const memoized = useRef(formData);
    const goBack = useGoPreviousOnClick();
    const descend = useDescendOnClick();
    const undo = useCallback(() => {
        setFormData(memoized.current);
    }, []);
    const commit = useCallback(() => {
        memoized.current = formData;
    }, [formData]);
    const onIgnore = usePreventDefault();
    const formID = `${type}-insert-form`;
    const display = toTitleCase(replaceAll('-', ' ')(formID));
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
    const getError = useCallback(
        (name: string) => {
            return getErrors(name, [{ current: null }, []])!;
        },
        [getErrors]
    );
    return (
        <form className='grid grid-cols-4 bg-cyan' id={formID} name={type} onSubmit={onIgnore} onReset={onIgnore}>
            <header className='col-span-4 ml-2 text-lg font-bold text-white bg-black border-2 rounded-t-xl border-cyan font-firaSans'>
                {display}
            </header>
            <InputControl key={0} inputType='text' name='_id' display='ID' validators={[]} required readOnly realm={realm} feedbacking={feedbacking} getter={(x: string) => getter(x as any, (y: ObjectId) => y.toHexString())} setter={setter as any} subscribe={subscribe} unsubscribe={unsubscribe} />
            {React.Children.toArray(children).map((x, ix) =>
                React.cloneElement(x as React.ReactElement, {
                    ...(x as React.ReactElement).props,
                    realm,
                    feedbacking,
                    key: ix + 1,
                    getErrors: getError,
                    setter,
                    getter,
                    subscribe,
                    setValue,
                    unsubscribe
                })
            )}
            <footer className='w-full col-span-4 bg-black border-2 rounded-b-lg border-cyan'>
                <ButtonGroup>
                    <FormButton id={`${formID}-reset-btn`} onClick={undo}>
                        Reset
                    </FormButton>
                    <FormButton id={`${formID}-cancel-btn`} onClick={goBack}>
                        Cancel
                    </FormButton>
                    <FormButton id={`${formID}-submit-btn`} onClick={onSubmit}>
                        Submit
                    </FormButton>
                </ButtonGroup>
            </footer>
        </form>
    );
}
