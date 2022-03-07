export function replaceAll(toReplace: string, replacement: string) {
    return (str: string): string =>
        str.includes(toReplace) ? replaceAll(toReplace, replacement)(str.replace(toReplace, replacement)) : str;
}
