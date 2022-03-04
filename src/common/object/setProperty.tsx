export function setProperty(propName: string, obj: Record<string, any>, value: any) {
    if (propName.includes('.')) {
        const [head, ...tail] = propName.split('.');
        setProperty(tail.join('.'), obj[head], value);
        return;
    }
    obj[propName] = value;
}
