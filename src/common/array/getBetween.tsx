export function getBetween<T>(start: T, end: T) {
    function inner(arr: T[], take = false, accum: T[] = []): T[] {
        if (arr.length === 0) {
            return accum;
        }
        const [head, ...tail] = arr;
        if (head === start || head === end) {
            return inner(tail, !take, accum.concat(head));
        }
        return take ? inner(tail, take, accum.concat(head)) : inner(tail, take, accum);
    }
    return (arr: T[]) => inner(arr);
}
