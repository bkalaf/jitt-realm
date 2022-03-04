import { caps } from './caps';

export function toTitleCase(str: string | undefined) {
    return str?.split(' ').map(caps).join(' ') ?? '';
}
export function letters(str: string) {
    return str.split('');
}
export function unletters(str: string[]) {
    return str.join('');
}
export function splitAt(pred: (x: string) => boolean) {
    return (str: string[] = [], current: string[] = [], accum: string[][] = []): string[][] => {
        if (str.length === 0) return [...accum, current];
        const [head, ...tail] = str;
        if (pred(head)) {
            return splitAt(pred)(tail, [head], [...accum, current]);
        }
        return splitAt(pred)(tail, [...current, head], accum);
    }
}
export function isUpper(x: string) {
    return x.toUpperCase() === x && x.toLowerCase() !== x;
}
export function camelToTitleCase(str: string) {
    const splitted = splitAt(isUpper)(letters(str)).map(unletters);
    return splitted.map(caps).join(' ');
}