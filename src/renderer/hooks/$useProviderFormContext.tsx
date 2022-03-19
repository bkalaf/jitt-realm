import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BSON } from 'realm';
import { getAssocPath } from '../../common/obj/getAssocPath';
import { setAssocPath } from '../../common/obj/setAssocPath';
import { useRecordType } from './useRecordType';
import { IFormContext2 } from '../db/IFormContext2';
import { ignore } from '../../common/ignore';

export function $useProvideFormContext<T extends { _id: BSON.ObjectId }, TCalc extends Record<string, any>>(realm: Realm, initializer?: Initializer<T>): IFormContext2<T, TCalc> {
    const [type, { convertTo, init }] = ['', { convertTo: ignore, init: ignore as any}];
    const [formData, setFormData] = React.useState(initializer ?? init());
    const [calcObject, setCalcObject] = React.useState({} as TCalc);
    const calculations = React.useRef<Map<string, (x: T, y: TCalc) => string>>(new Map());
    const [errors, setErrors] = React.useState<[propertyName: string, error: string][]>([]);
    const clearErrors = React.useCallback(() => setErrors([]), []);
    const appendError = React.useCallback((propertyName: string, message: string) => {
        setErrors((prev) => [...prev, [propertyName, message]]);
    }, []);
    const getErrors = React.useCallback(
        (name: string) => () => {
            return errors.filter(([k, v]) => name === k).map(([k, v]) => v);
        },
        [errors]
    );
    const isValid = React.useMemo(() => errors.length === 0, [errors]);
    const subscribeCalculation = React.useCallback((name: string, add: (x: T, y: TCalc) => string) => {
        calculations.current.set(name, add);
    }, []);
    const unsubscribeCalculation = React.useCallback((name: string, add: (x: T, y: TCalc) => string) => {
        calculations.current.delete(name);
    }, []);
    const onInput = React.useCallback(() => {
        console.log('onInput');
        setCalcObject((prev) => {
            let copy: TCalc = { ...prev };
            Array.from(calculations.current.entries()).forEach(([name, func]) => {
                if (func) {
                    const result = func(formData, prev);
                    console.log(`calculation result`, result);
                    copy = setAssocPath(name, copy, func(formData, prev)) as TCalc;
                }
            });
            return copy;
        });
    }, [calculations, formData]);
    const memoized = React.useRef(formData);
    const navigate = useNavigate();
    const getField = React.useCallback(
        function <TValue>(name: string): () => TValue {
            return () => getAssocPath(name, formData) ?? getAssocPath(name, calcObject);
        },
        [calcObject, formData]
    );
    const setField = React.useCallback(
        (name: string) => (ev: any) => {
            setFormData((prev: T) => setAssocPath(name, prev, ev) as T);
        },
        []
    );
    const createGetterSetter = React.useCallback(
        function <TValue>(name: string): [() => TValue, (ev: TValue) => void, () => string[]] {
            return [getField(name), setField(name), getErrors(name)];
        },
        [getErrors, getField, setField]
    );
    const onCancel = React.useCallback(() => {
        navigate('..');
    }, [navigate]);
    const onSubmit = React.useCallback(() => {
        realm.write(() => {
            const result = realm.create<T>(type, formData as T, Realm.UpdateMode.Modified);
            navigate(result._id.toHexString());
        });
    }, [formData, navigate, realm, type]);
    const onReset = React.useCallback(() => {
        setFormData(memoized.current);
    }, []);
    const [isFeedbacking, setIsFeedbacking] = React.useState(false);
    const showFeedback = React.useCallback(() => setIsFeedbacking(true), []);
    const hideFeedback = React.useCallback(() => setIsFeedbacking(false), []);

    return React.useMemo(
        () => ({
            createGetterSetter,
            formData,
            onSubmit,
            realm,
            onReset,
            onInput,
            onCancel,
            calcObject,
            subscribeCalculation,
            unsubscribeCalculation,
            isValid,
            appendError,
            clearErrors,
            hideFeedback,
            showFeedback,
            isFeedbacking
        }),
        [
            createGetterSetter,
            formData,
            onSubmit,
            realm,
            onReset,
            onInput,
            onCancel,
            calcObject,
            subscribeCalculation,
            unsubscribeCalculation,
            isValid,
            appendError,
            clearErrors,
            hideFeedback,
            showFeedback,
            isFeedbacking
        ]
    );
}
