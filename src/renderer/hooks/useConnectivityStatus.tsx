import { useCallback, useState } from 'react';
import { useEventListener } from './useEventListener';

export function useConnectivityStatus() {
    const [isConnected, setIsConnected] = useState(() => window.navigator.onLine);
    const onlineListener = useCallback((ev: Event) => {
        setIsConnected(true);
    }, []);
    const offlineListener = useCallback((ev: Event) => {
        setIsConnected(false);
    }, []);
    useEventListener('online', onlineListener, window);
    useEventListener('offline', offlineListener, window);
    return isConnected;
}
