import { useContext, useMemo } from 'react';
import { IEmbeddedContext, EmbeddedContext } from '../routes/providers/EmbeddedContext/index';

/**
 * @deprecated
 */
export function useProvideEmbeddedContext(type: string, name: string, realm: Realm): IEmbeddedContext {
    const ctxt = useContext(EmbeddedContext);
    const value = useMemo(() => ctxt == null ? ({ type, prefix: [], realm }) : ({ type, prefix: [...ctxt.prefix, ...name.split('.')], realm }), [ctxt, name, realm, type]);
    return value;
}
