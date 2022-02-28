export function setAssocPath<T>(path: string, object: Record<string, any>, value: T): Record<string, any> {
    if (path.includes('.')) {
        const [head, ...tail] = path.split('.');
        if (tail.length > 0) {
            return { ...object, [head]: setAssocPath(tail.join('.'), object[head], value) };
        }
        return { ...object, [head]: value };
    }
    return { ...object, [path]: value };
}
