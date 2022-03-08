export function asPercentage(n: number) {
    return `${(n * 100).toFixed(2)}%`;
}
export function isEmptyOrNull(s?: string | null | undefined): s is null | undefined | '' {
    return s == null || s.length === 0;
}
export function ifNotEmptyOrNull<T>(func: (s: string) => T, defReturn: any) {
    return (s?: string): T => (isEmptyOrNull(s) ? defReturn : func(s));
}
export function fromPercentage(s: string): number {
    return ifNotEmptyOrNull((str) => parseFloat(str.replace('%', '')) / 100, 0)(s);
}
