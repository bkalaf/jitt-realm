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
