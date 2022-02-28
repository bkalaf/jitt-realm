export function getAssocPath<T>(path: string, object: Record<string, any>): T {
    const [head, ...tail] = path.split('.');
    if (tail.length === 0) {
        return object[head];
    }
    const next = object[head] ?? {};
    return getAssocPath(tail.join('.'), next);
}
