import { type } from 'os';
import React, { useContext, useMemo } from 'react';
import { Boundary } from '../../../components/suspense/Boundary';
import { useProvideEmbeddedContext } from '../../../hooks/useProvideEmbeddedContext';
import { Bound } from './Bound';

export type IEmbeddedContext = {
    prefix: string[];
    type: string;
    realm: Realm;
};
export const EmbeddedContext = React.createContext<IEmbeddedContext | undefined>(undefined);
export function EmbeddedContextProvider({ realm, type, children }: { name?: string; children?: Children; type: string; realm: Realm }) {
    const value = useProvideEmbeddedContext(type, type, realm);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <EmbeddedContext.Provider value={value}>{children}</EmbeddedContext.Provider>
        </Boundary>
    );
}

export function NewEmbeddedContext({ realm, type, children }: { realm: Realm; type: string; children: Children }) {
    console.log('NewEmbeddedContext');
    const value = useMemo(() => ({ prefix: [], type, realm }), [realm, type]);
    return (
        <Bound>
            <EmbeddedContext.Provider value={value}>{children}</EmbeddedContext.Provider>
        </Bound>
    );
}
export function AddEmbeddedStack({ type, name, children }: { name: string; type: string; children: Children }) {
    const { realm, prefix } = useContext(EmbeddedContext)!;
    const value = useMemo(() => ({ type, realm, prefix: [...prefix, name] }), [name, prefix, realm, type]);
    return (
        <Bound>
            <EmbeddedContext.Provider value={value}>{children}</EmbeddedContext.Provider>
        </Bound>
    );
}

