import React from 'react';
import { identity } from '../../common/identity';
import { ignore } from '../../common/ignore';
import { DbDataType, DbOutputType } from '../components/forms/DbFieldValue';
import { IDbFieldValue } from '../components/forms/useControl2';
import { unzip } from '../layout/unzip';
import { IFormRegistrar } from '../components/forms/FormContext';

export function useProvideRegistrar<
    TBacking extends DbDataType,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType,
    TElement extends DataEntryElement,
    TFormData extends Record<string, DbDataType>
>(): IFormRegistrar<TBacking, TOutput, TChanging, TElement, TFormData> {
    const registrar = React.useRef<Map<string, IDbFieldValue<TBacking, TOutput, TChanging, TElement>>>(new Map());
    const register = React.useCallback((name: string, data: IDbFieldValue<TBacking, TOutput, TChanging, TElement>) => {
        console.log('registering: ', name, data);
        registrar.current.set(name, data);
        return () => {
            console.log('unregistering: ', name, data);
            registrar.current.delete(name);
        };
    }, []);
    const updateRegistrar = React.useCallback(
        (name: string, data: IDbFieldValue<TBacking, TOutput, TChanging, TElement>): Promise<void> => {
            registrar.current.set(name, data);
            return Promise.resolve();
        },
        []
    );
    const toFormData = React.useCallback((): [boolean, TFormData] => {
        const result = {} as Record<string, DbDataType>;
        const [validationResults, values] = unzip(
            Array.from(registrar.current.entries()).map(([k, v]) => [v.isInvalid, [k, v.changing]] as [boolean, [string, DbDataType]])
        );
        const isFormValid = validationResults.some(identity);
        values.forEach(([k, v]) => {
            result[k] = v;
        });
        return [isFormValid, result as TFormData];
    }, []);
    const getDbField = React.useCallback((name: string) => {
        return () => {
            return registrar.current.get(name);
        };
    }, []);
    const getOutput = React.useCallback(
        (name: string) => () => {
            return getDbField(name)()?.output;
        },
        [getDbField]
    );
    const getFeedback = React.useCallback(
        (name: string) => () => {
            return registrar.current.get(name)?.errors.join('\n');
        },
        []
    );
    const undoAll = React.useCallback(() => {
        const func = Array.from(registrar.current.values())
            .map((x) => x.undo)
            .reduce(
                (pv, cv) => () => {
                    pv();
                    cv();
                },
                ignore
            );
    }, []);
    const dirtyControls = React.useCallback(() => {
        return Array.from(registrar.current.entries())
            .filter(([k, v]) => v.isDirty())
            .map(([k, v]) => k);
    }, []);
    return {
        register,
        updateRegistrar,
        toFormData,
        getOutput,
        getFeedback,
        getDbField,
        undoAll,
        dirtyControls
    };
}
