import { useCallback, useEffect, useState } from 'react';
import { createReader, DataReader } from '../../common/resource';

export function useAsyncResource<T extends any[], U>(func: (...args: T) => Promise<U>, ...args: T): [DataReader<U>, (...args: T) => void] {
    console.log('useAsyncResource');
    const [reader, setReader] = useState(() => createReader(func, ...args))
    console.log('reader', reader);
    const updateReader = useCallback((...newArgs: T) => {
        setReader(prev => {
            return createReader(func, ...newArgs);
        })
    }, []);
    return [reader, updateReader];
}