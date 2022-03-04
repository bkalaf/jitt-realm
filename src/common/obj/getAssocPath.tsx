export function getAssocPath<T>(path: string, object: Record<string, any>): T {
    const [head, ...tail] = (path ?? '').split('.');
    if (tail.length === 0) {
        return object[head];
    }
    if (head.length === 0) {
        process.stderr.write('getAssocPath:Error:head is empty string');
        process.stderr.write(JSON.stringify(object));
        void 0;
    }
    const next = object[head] ?? {};
    return getAssocPath(tail.join('.'), next);
}
