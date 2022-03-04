import React from 'react';
import { $useProvideFormContext } from '../hooks/$useProviderFormContext';
import { IFormContext2 } from './IFormContext2';

export const FormContext2 = React.createContext<IFormContext2<Record<string, any>, Record<string, any>> | undefined>(undefined);

/**
 *
 * @param {{children: Children }} param0 [{ children: Children, canSubmit: boolean, realm: Realm }]
 * @returns React.ReactElement
 */
export function FormProvider({ children, canSubmit, realm }: { children?: Children; canSubmit: boolean; realm: Realm }) {
    const value = $useProvideFormContext(realm);
    return <FormContext2.Provider value={value}>{children}</FormContext2.Provider>;
}
