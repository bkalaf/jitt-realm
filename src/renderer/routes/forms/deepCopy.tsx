export function deepCopy<T extends Record<string, any>>(obj: T): T {
    const copy = new Object();
    Object.getOwnPropertyNames(obj).map((key) => {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        Object.defineProperty(copy, key, {
            [key]: {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                get: desc?.get
            }
        });
    });
    return copy as T;
}
