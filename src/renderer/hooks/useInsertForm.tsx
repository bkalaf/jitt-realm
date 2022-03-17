import { useContext, useMemo } from 'react';
import { InsertFormCtxt } from '../routes/providers/InsertFormCtxt/index';
import { useAdjustNames } from './useAdjustNames';

/**
 * @deprecated
 */
export function useInsertForm(type?: string, display?: string) {
        console.log('useInsertForm', type, display);
        const constant = useContext(InsertFormCtxt)!;
        // const ids = useAdjustNames(type ?? '', display);
        return useMemo(() =>({
        ...constant,
        // ...ids
    }), [constant]);
}
