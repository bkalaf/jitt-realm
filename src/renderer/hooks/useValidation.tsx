// @flow
import { useRef, useEffect } from 'react';

export function useValidation<T, K extends keyof T & string>(isUnsaved: IBinaryPredicate, name: K, subscribe: Subscriber<T>, unsubscribe: IActionFunction<K>, validators: Validator2<T>[]) {
    const ref = useRef<DataEntryElement>(null);
    useEffect(() => {
        subscribe(name, [ref, isUnsaved, validators]);
        return () => unsubscribe(name);
    });
    return ref;
}
