export function setPropertyByPath(name: string, obj: Record<string, any>, value: any): any {
    function inner() {
        if (name == null || name.length === 0) return value;
        if (!name.includes('.')) {
            return { ...obj, [name]: value };
        }
        const [head, ...tail] = name.split('.');
        return { ...obj, [head]: setPropertyByPath(tail.join('.'), obj[head], value) };
    }

    const result = inner();
    Object.getOwnPropertyNames(obj).filter(x => {
        const desc = Object.getOwnPropertyDescriptor(obj, x);
        const isGetter = desc?.get != null && desc?.set == null;
        console.log('isGetOnly', isGetter, x);
        return isGetter;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    }).forEach(x => Object.defineProperty(result, x, { get: Object.getOwnPropertyDescriptor(obj, x)?.get }));
    return result;
}
