export function setPropertyByPath(name: string, obj: Record<string, any>, value: any): any {
    if (name == null || name.length === 0) return value;
    if (!name.includes('.')) {
        return { ...obj, [name]: value };
    }
    const [head, ...tail] = name.split('.');
    return { ...obj, [head]: setPropertyByPath(tail.join('.'), obj[head], value) };
}
