import { createFrom } from '../array/createFrom';
import { rangeBetween } from '../array/rangeBetween';

export function generateRandomString(length: number) {
    const arr = createFrom(() => Math.random(), length);
    const chars = rangeBetween('A'.charCodeAt(0), 'Z'.charCodeAt(0))
        .concat(rangeBetween('a'.charCodeAt(0), 'z'.charCodeAt(0)))
        .concat(rangeBetween('0'.charCodeAt(0), '9'.charCodeAt(0)));
    const possibles = chars.length;
    return arr.map((x) => String.fromCharCode(chars[Math.floor(x * possibles)])).join('');
}
