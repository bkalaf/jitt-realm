import { useContext } from 'react';
import { IEmbeddedContext, EmbeddedContext } from './InsertFormProvider';

export function useProvideEmbeddedContext(name: string): IEmbeddedContext {
    const ctxt = useContext(EmbeddedContext);
    if (ctxt == null) return { prefix: [] };
    return { prefix: [...ctxt.prefix, name] };
}
