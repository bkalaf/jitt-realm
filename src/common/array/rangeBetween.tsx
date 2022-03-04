export function rangeBetween(start: number, end: number): number[] {
    if (start > end) {
        return [];
    }
    return [start, ...rangeBetween(start + 1, end)];
}
