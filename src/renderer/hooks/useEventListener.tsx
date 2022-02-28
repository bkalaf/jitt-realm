import { useEffect } from 'react';

export function useEventListener<T extends Event>(event: string, listener: (x: T) => void, source: IEventer<T>) {
    useEffect(() => {
        source.addEventListener(event, listener);
        return () => source.removeEventListener(event, listener);
    }, [event, listener, source]);
}
