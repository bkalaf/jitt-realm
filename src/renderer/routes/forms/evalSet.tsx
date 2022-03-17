import { deepCopy } from './deepCopy';
/**
 * @deprecated
 */
export function evalSet<T, K extends keyof T>(name: K, setState: StateSetter<T>, value: T[K]) {
    return setState((prev) => {
        const copy = deepCopy(prev);
        eval(`copy.${name as string} = value`);
        return copy;
    });
}
