import { Result } from "../../../../hooks/Result";
import { wrapTry } from './wrapTry';

export function trySetter<T, TElement extends DataEntryElement>(unsavedSetter: StateSetter<string | undefined>, setter: StateSetter<T>, converter: (x: string) => T) {
    return function (ev: React.ChangeEvent<TElement>) {
        const func = wrapTry(converter);
        const result = func(ev.target.value);
        if (Result.isPass(result)) {
            unsavedSetter(undefined);
            return setter(result.value);
        }
        unsavedSetter(ev.target.value);
    };
}
