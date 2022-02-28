export function caps(str: string) {
    if (str.length === 0) return '';
    return str[0].toUpperCase().concat(str.substring(1));
}
