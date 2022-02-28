import { caps } from './caps';

export function toTitleCase(str: string) {
    return str.split(' ').map(caps).join(' ');
}
