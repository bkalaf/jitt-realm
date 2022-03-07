import { caps } from './caps';

export function toTitleCase(str: string | undefined) {
    return str?.split(' ').map(caps).join(' ') ?? '';
}
export function letters(str: string) {
    return str.split('');
}
export function isUpper(x: string) {
    return x.toUpperCase() === x && x.toLowerCase() !== x;
}
