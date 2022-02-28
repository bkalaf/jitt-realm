export function unique<T>(arr: T[], accum: T[] = []): T[] {
    if (arr.length === 0) {
        return accum;
    }
    const [head, ...tail] = arr;
    if (accum.includes(head)) {
        return unique(tail, accum);
    }
    return unique(tail, [...accum, head]);
}
