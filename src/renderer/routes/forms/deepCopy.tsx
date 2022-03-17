export function deepCopy<T extends Record<string, any>>(obj: T): T {
    const copy = new Object();
    console.log(Object.getOwnPropertyNames(obj));
    Object.getOwnPropertyNames(obj).forEach((key) => {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        console.log(desc);
        Object.defineProperty(copy, key, desc?.value != null
                ? {
                      value: desc?.value
                  }
                : {
                      // eslint-disable-next-line @typescript-eslint/unbound-method
                      get: desc?.get
                  });
    });
    console.log('copy', copy);
    return copy as T;
}
