import React from 'react';
import { ObjectId } from '../controls';
import { InsertFormCtxt } from './InsertForm';
import { useProvideInsertForm } from './useProvideInsertForm';

export function InsertFormProvider({ realm, initial, type, children }: { realm: Realm; type: string; initial: () => Record<string, any> & { _id: ObjectId }; children?: Children }) {
    const value = useProvideInsertForm(initial, type, realm);
    return <InsertFormCtxt.Provider value={value}>{children}</InsertFormCtxt.Provider>;
}

export type IEmbeddedContext = {
    prefix: string[];
};
export const EmbeddedContext = React.createContext<IEmbeddedContext | undefined>(undefined);
