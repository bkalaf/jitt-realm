import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logger } from '../../layout/Logger';
import { IFormContext } from './FormContext';
import { ObjectId } from 'bson';
import { useDialog } from '../../hooks/useDialog';
import { ignore } from '../../../common/ignore';
import { useProvideRegistrar } from '../../providers/useProvideRegistrar';
import { DbDataType, DbOutputType } from './DbFieldValue';
import { useActiveElement } from '../../hooks/useActiveElement';
import * as BSON from 'bson';
import { IDbFieldValue } from './useControl2';
export type DialogType = 'error' | 'info' | 'question' | 'warning' | 'none';

export function useProvideFormContext<
    TBacking extends DbDataType,
    TFormData extends Record<string, DbDataType>,
    TElement extends DataEntryElement,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType
>(
    initial: TFormData,
    saveFunction: (formData: TFormData) => Promise<BSON.ObjectId>,
    onSuccessRedirect: string
): IFormContext<DbDataType, DbOutputType, DbOutputType, TElement> {
    Logger.enter('useProvideFormContext');
    const [isShowFeedback, setShowFeedback] = React.useState(false);
    const displayFeedback = React.useCallback(() => {
        setShowFeedback(true);
    }, []);
    const hideFeedback = React.useCallback(() => {
        setShowFeedback(false);
    }, []);
    const { dirtyControls, register, undoAll, toFormData, updateRegistrar, getFeedback, getOutput, getDbField } = useProvideRegistrar<
        DbDataType,
        TOutput,
        string,
        TElement,
        TFormData
    >();
    const blurActiveElement = useActiveElement((x: HTMLElement) => x.blur());
    const navigate = useNavigate();
    const lastSaved = React.useRef(initial);

    const saveDialog = useDialog<[ObjectId]>(
        'Do you want to enter another record or go to the previously entered record?',
        'What to do?',
        'question',
        'Enter Another',
        'Navigate to Record Just Entered',
        'Continue'
    )(
        (oid: ObjectId) => ignore(),
        (oid: ObjectId) => navigate(`../${oid.toHexString()}`),
        (oid: ObjectId) => navigate(onSuccessRedirect)
    );

    const onSubmit = React.useCallback(async () => {
        try {
            blurActiveElement();
            const [isSubmitable, formData] = toFormData();
            if (!isSubmitable) {
                throw new Error(`Form is not submitable.`);
            }
            const result = await saveFunction(formData );
            await saveDialog(result);
        } catch (error) {
            alert((error as any).message);
        }
    }, [blurActiveElement, saveDialog, saveFunction, toFormData]);

    const onCancel = useCallback(() => {
        navigate('..');
    }, [navigate]);
    const onReset = useCallback(() => {
        undoAll();
    }, [undoAll]);
    const dependents = React.useRef<Array<string>>([]);
    const addDependent = useCallback((d: string) => {
        dependents.current = [...dependents.current, d];
    }, []);
    const removeDependent = useCallback((d: string) => {
        dependents.current = dependents.current.filter((x) => x !== d);
    }, []);
    const subscribeCalculation = useCallback(
        (d: string) => {
            addDependent(d);
            return () => removeDependent(d);
        },
        [addDependent, removeDependent]
    );
    const onInput = useCallback(
        (ev: React.FormEvent) => {
            dependents.current.map(eval);
        },
        [dependents]
    );
    return React.useMemo(
        () => ({
            dirtyControls,
            subscribeCalculation,
            onSubmit,
            onCancel,
            onReset,
            onInput,
            register: register as any,
            updateRegistrar: updateRegistrar as any,
            getOutput,
            getFeedback,
            getDbField: getDbField as any,
            displayFeedback,
            hideFeedback,
            isShowFeedback
        }),
        [dirtyControls, subscribeCalculation, onSubmit, onCancel, onReset, onInput, register, updateRegistrar, getOutput, getFeedback, getDbField, displayFeedback, hideFeedback, isShowFeedback]
    );
}
