export function asCurrency(x: number) {
    return `$${x.toFixed(2)}`;
}
export function fromCurrency(x: string) {
    return parseFloat(x.replace('$', ''));
}