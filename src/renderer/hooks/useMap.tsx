import { useCallback, useMemo, useRef } from 'react';

export function useMap<T, U>(initial: [T, U][] = [], combinator?: (x: U, y: U) => U) {
    const backing = useRef(new Map(initial));
    const add = useCallback((item: T, value: U) => {
        backing.current.set(item, value);
    }, []);
    const remove = useCallback((item: T) => {
        backing.current.delete(item);
    }, []);
    const has = useCallback((item: T) => {
        return backing.current.has(item);
    }, []);
    const get = useCallback((item: T, defValue?: U) => {
        return backing.current.get(item) ?? defValue;
    }, []);
    const upsert = useCallback(
        (item: T, value: U) => {
            if (has(item) && combinator != null) {
                const current = get(item)!;
                return add(item, combinator(current, value));
            }
            add(item, value);
        },
        [add, combinator, get, has]
    );
    const clear = useCallback(() => {
        Array.from(backing.current.keys()).forEach(remove);
    }, [remove]);
    return useMemo(
        () => ({
            backing,
            add,
            remove,
            has,
            get,
            clear,
            upsert
        }),
        [add, clear, get, has, remove, upsert]
    );
}
