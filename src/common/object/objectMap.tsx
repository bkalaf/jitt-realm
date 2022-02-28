import { identity } from '../identity';

export function objectMap<T, U>(obj: Record<string, T>, keyFunc: (x: string) => string, valueFunc: (x: T) => U = identity as any) {
    return Object.entries(obj)
        .map(([k, v]) => ({ [keyFunc(k)]: valueFunc(v) }))
        .reduce((pv, cv) => ({ ...pv, ...cv }), {});
}
