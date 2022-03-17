import React from 'react';
import { Boundary } from '../components/suspense/Boundary';
import { $useProvideFormContext } from '../hooks/$useProviderFormContext';
import { useRecordType } from '../hooks/useRecordType';
import { IFormContext2 } from './IFormContext2';

export const FormContext2 = React.createContext<IFormContext2<Record<string, any>, Record<string, any>> | undefined>(undefined);

/**
 *
 * @param {{children: Children }} param0 [{ children: Children, canSubmit: boolean, realm: Realm }]
 * @returns React.ReactElement
 */
export function FormProvider({ children, canSubmit, realm }: { children?: Children; canSubmit: boolean; realm: Realm }) {
    const [, Ctor] = useRecordType() as any;
    const value = $useProvideFormContext(realm, Ctor.init);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <FormContext2.Provider value={value}>{children}</FormContext2.Provider>
        </Boundary>
    );
}
