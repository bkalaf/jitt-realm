import React from 'react';
import { EmbeddedContext } from './InsertFormProvider';
import { useProvideEmbeddedContext } from './useProvideEmbeddedContext';

export function EmbeddedContextProvider({ children, name }: { name?: string; children?: Children }) {
    const value = useProvideEmbeddedContext(name ?? '');
    return <EmbeddedContext.Provider value={value}>{children}</EmbeddedContext.Provider>;
}
