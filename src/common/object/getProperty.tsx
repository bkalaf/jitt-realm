export function getProperty(name: string, obj: Record<string, any> = {}): any {
    if (name == null || name.length === 0) return obj;
    if (!name.includes('.')) {
        return obj[name];
    }
    const [head, ...tail] = name.split('.');
    return getProperty(tail.join('.'), obj[head]);
}
