export function unzip<T, U>(arr: [T, U][]): [T[], U[]] {
    if (arr.length === 0) {
        return [[], []];
    }
    const [[head1, head2], ...tail] = arr;
    const [remain1, remain2] = unzip(tail);
    return [
        [head1, ...remain1],
        [head2, ...remain2]
    ];
}
