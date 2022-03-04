import React from 'react';

export function $useSubscribe<T>(subscribe: (x: T) => void, unsubscribe: (x: T) => void, item?: T) {
    React.useEffect(() => {
        if (item == null) return;
        subscribe(item);
        return () => unsubscribe(item);
    }, [item, subscribe, unsubscribe]);
}
