import React from 'react';
import { createContext, useMemo } from 'react';
import { Boundary } from '../Boundary';
import { DbDataType, DbOutputType } from './DbFieldValue';
import { ignore } from '../../../common/ignore';
import { useRecordType } from '../../hooks/useRecordType';
import { Logger } from '../../layout/Logger';
import { useProvideFormContext } from '../../hooks/useProvideFormContext';
import * as BSON from 'bson';
import { useProvideRegistrar } from '../../providers/useProvideRegistrar';
import { IDbFieldValue } from './useControl2';

export type IFormRegistrar<
    TBacking extends DbDataType,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType,
    TElement extends DataEntryElement,
    TFormData extends Record<string, DbDataType>
> = {
    register: (name: string, data: IDbFieldValue<TBacking, TOutput, TChanging, TElement>) => IUnsubscribe;
    updateRegistrar: (name: string, data: IDbFieldValue<TBacking, TOutput, TChanging, TElement>) => Promise<void>;
    toFormData: () => [boolean, TFormData];
    getOutput: (name: string) => () => TOutput | undefined;
    getFeedback: (name: string) => () => string | undefined;
    getDbField: (name: string) => () => IDbFieldValue<TBacking, TOutput, TChanging, TElement> | undefined;
    undoAll: () => void;
    dirtyControls: () => string[];
};
export type IFormContext<
    TBacking extends DbDataType,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType,
    TElement extends DataEntryElement,
> = {
    dirtyControls: () => string[];
    onSubmit: () => void;
    onReset: () => void;
    onCancel: () => void;
    subscribeCalculation: (calc: string) => IUnsubscribe;
    onInput: (ev: React.FormEvent) => void;
    register: (name: string, data: IDbFieldValue<TBacking, TOutput, TChanging, TElement>) => IUnsubscribe;
    updateRegistrar: (name: string, data: IDbFieldValue<TBacking, TOutput, TChanging, TElement>) => Promise<void>;
    getOutput: (name: string) => () => TOutput | undefined;
    getFeedback: (name: string) => () => string | undefined;
    getDbField: (name: string) => () => IDbFieldValue<TBacking, TOutput, TChanging, TElement> | undefined;
    displayFeedback: () => void;
    hideFeedback: () => void;
    isShowFeedback: boolean;
};

export const FormContext = React.createContext<
    IFormContext<DbDataType, DbOutputType, DbOutputType, DataEntryElement> | undefined
>(undefined);

export function FormContextProvider<TFormData extends Record<string, DbDataType & { _id: BSON.ObjectId }>>({
    children,
    realm
}: {
    children?: Children;
    realm: Realm;
}) {
    Logger.enter('FormContextProvider');
    const { toFormData, register, updateRegistrar } = useProvideRegistrar();
    const [type, { init }] = useRecordType();
    const initial = useMemo(() => init() as TFormData, [init]);
    const value = useProvideFormContext(
        initial,
        (fd: TFormData) =>
            new Promise((res, rej) => {
                realm.write(() => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    const id = realm.create<{ _id: BSON.ObjectId }>(type, fd as any, Realm.UpdateMode.Modified);
                });
            }),
        '/'
    );
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <FormContext.Provider value={value}>{children}</FormContext.Provider>
        </Boundary>
    );
}
