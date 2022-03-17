export function splitAt(pred: (x: string) => boolean) {
    return (str: string[] = [], current: string[] = [], accum: string[][] = []): string[][] => {
        if (str.length === 0) return [...accum, current];
        const [head, ...tail] = str;
        if (pred(head)) {
            return splitAt(pred)(tail, [head], [...accum, current]);
        }
        return splitAt(pred)(tail, [...current, head], accum);
    };
}
