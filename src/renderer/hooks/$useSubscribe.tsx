import React from 'react';
/**
 * @deprecated
 */
export function $useSubscribe<T extends any[]>(subscribe: (...x: T) => void, unsubscribe: (...x: T) => void, ...items: T) {
    React.useEffect(() => {
        if (items == null || items.length !== subscribe.length || items.some((x) => x == null)) {
            return;
        }
        subscribe(...items);
        return () => unsubscribe(...items);
    }, [items, subscribe, unsubscribe]);
}
