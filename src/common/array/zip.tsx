export function zip<T, U>(arr1: T[], arr2: U[]): [number, T, U][] {
    if (arr1.length === 0) {
        return [];
    }
    const [head1, ...tail1] = arr1;
    const [head2, ...tail2] = arr2;
    const result = [[head1, head2], ...zip(tail1, tail2)];
    return result.map(([a, b], ix) => [ix, a, b] as [number, T, U]);
}
