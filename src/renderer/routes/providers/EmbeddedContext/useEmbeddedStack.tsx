import { useContext } from 'react';
import { IEmbeddedContext, EmbeddedContext } from './index';

export function useEmbeddedStack(): IEmbeddedContext {
    console.log('useEmbeddedStack');
    const ctxt = useContext(EmbeddedContext);
    if (!ctxt) alert('null context');
    return ctxt!;
}
