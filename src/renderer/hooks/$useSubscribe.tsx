import React from 'react';

export function $useSubscribe<T extends any[]>(subscribe: (...x: T) => void, unsubscribe: (...x: T) => void, ...items: T) {
    React.useEffect(() => {
        console.log(`subscribe.length`, subscribe.length, `items.length`, items?.length ?? 0);
        if (items == null || items.length !== subscribe.length || items.some((x) => x == null)) {
            console.log(`not subscribing`, items);
            return;
        }
        subscribe(...items);
        return () => unsubscribe(...items);
    }, [items, subscribe, unsubscribe]);
}
