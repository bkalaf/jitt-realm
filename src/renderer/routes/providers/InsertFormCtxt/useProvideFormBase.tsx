import React, { useCallback, useMemo, useRef, useState } from 'react';
import { caps } from '../../../../common/text/caps';
import { ignore } from '../../../../common/ignore';
import { useBoolean } from '../../../hooks/useBoolean';
import { useDescendOnClick } from '../../../hooks/useDescendOnClick';
import { Result } from "../../../hooks/Result";
import { useNavigate } from 'react-router-dom';
import { useEmbeddedStack } from '../EmbeddedContext/useEmbeddedStack';
import { condense } from './condense';
import { DTO, FormBaseContext } from './index';
import { getProperty, setProperty } from '../../data/auctions/selfStorage/SelfStorageInsertForm';
import { identity } from '../../../../common/identity';

export function useProvideFormBase<TDto extends DTO>(name: string, type: string, initial: () => TDto, convertTo: (x: any) => any, drillOnSuccess = false): FormBaseContext {
    console.log('useProvideFormBase');
    const formName = [type, name, 'form'].join('-');
    const formHeader = formName.replace('-', ' ').split(' ').map(caps).join(' ');
    const [feedbacking, showFeedback, hideFeedback] = useBoolean(false);
    const { prefix, realm } = useEmbeddedStack();
    const refs = useRef<Map<string, React.RefObject<DataEntryElement>>>(new Map());
    const validators = useRef<Map<string, (x: any) => Result<any>>>(new Map());
    const init = initial();
    const memoized = useRef(init);
    console.log('useProvideFormBase2');

    const [formData, setFormData] = useState(init);
    const commit = useCallback(() => (memoized.current = formData), [formData]);
    const undo = useCallback(() => (memoized.current ? setFormData(memoized.current) : ignore()), []);
    console.log('useProvideFormBase3');

    const getValue = useCallback(
        (propName: string, stringify: IStringifyFunction = identity) => {
            const result = stringify(getProperty(propName, formData));
            return () => result;
        },
        [formData]
    );
    const setValue = useCallback(
        (propName: string, parse: IParseFunction = identity) =>
            (value: any) => {
                setFormData((prev) => {
                    return setProperty(propName, prev, parse(value));
                });
            },
        []
    );
    const onReset = undo;
    const onCancel = useDescendOnClick();
    const subscribe = useCallback(
        (propName: string, ref: React.RefObject<DataEntryElement>, v: Array<(x: any) => Result<any>>) => {
            refs.current.set([...prefix, propName].join('.'), ref);
            validators.current.set([...prefix, propName].join('.'), (x?: any) => v.reduce(condense, () => Result.toPass(x))(x));
            return () => {
                refs.current.delete([...prefix, propName].join('.'));
                validators.current.delete([...prefix, propName].join('.'));
            };
        },
        [prefix]
    );
    console.log('useProvideFormBase5');

    const onValidate = useCallback((): Result<TDto> => {
        const all = Array.from(validators.current.entries()).map(([k, validate]): Result<any> => {
            const r = refs.current.get(k)!;
            const value = getProperty(k, formData);
            const validResult = validate(value);
            if (Result.isPass(validResult)) r.current?.setCustomValidity('');
            else r.current?.setCustomValidity(validResult.value.join('\n'));
            return r.current?.validity.valid ? Result.toPass(value) : Result.toFail(r.current?.validationMessage ?? '');
        });
        return all.reduce((pv, cv) => {
            if (Result.isPass(pv) && Result.isPass(cv)) {
                return pv;
            }
            if (Result.isPass(pv)) {
                return cv;
            }
            if (Result.isFail(cv)) {
                return Result.toFail(...pv.value, ...cv.value);
            }
            return pv;
        }, Result.toPass(formData));
    }, [formData]);
    const navigate = useNavigate();
    const execute = useCallback(
        (afterWrite: (dto: TDto) => void) => () => {
            hideFeedback();
            const valid = onValidate();
            if (Result.isFail(valid)) {
                alert(valid.value.join('\n'));
                showFeedback();
                return;
            }
            realm.write(() => {
                const _id = realm.create<TDto>(type, convertTo(formData), Realm.UpdateMode.Modified);
                commit();
                afterWrite(_id);
            });
        },
        [commit, convertTo, formData, hideFeedback, onValidate, realm, showFeedback, type]
    );
    console.log('useProvideFormBase6');

    const onSubmit = execute((dto) => (drillOnSuccess ? navigate(dto._id.toHexString()) : ignore()));
    return useMemo(
        () => ({
            onSubmit,
            onCancel,
            onReset,
            feedbacking,
            formName,
            formHeader,
            getValue,
            setValue,
            subscribe
        }),
        [feedbacking, formHeader, formName, getValue, onCancel, onReset, onSubmit, setValue, subscribe]
    );
}
