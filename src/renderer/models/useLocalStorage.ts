import { useCallback, useRef } from 'react';
import { ignore } from '../../common/ignore';

export function useLocalStorage(key: string, defValue: string) {
    const getItem = useCallback((key: string) => () => {
        return localStorage.getItem(key) ?? defValue;
    }, [defValue]);
    const setItem = useCallback((key: string) => (value: string) => {
        localStorage.setItem(key, value);
    }, []);
    return [getItem(key), setItem(key)] as [() => string, (value: string) => void];
}

export function useAutoIncrement(key: string) {
    const [getter, setter] = useLocalStorage(key, '0');
    const committer = useRef<() => void>(ignore);
    const incr = useCallback(() => {
        const result = parseInt(getter(), 10) + 1;
        committer.current = () => setter(incr.toString());
        return result;
    }, [getter, setter]);
    const rollback = useCallback(() => {
        committer.current = ignore;
    }, []);
    const commit = useCallback(() => {
        committer.current();
        committer.current = ignore;
    }, []);
    return {
        incr,
        commit,
        rollback
    }; 
}