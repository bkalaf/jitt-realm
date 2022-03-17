export function formatTel(x: string) {
    return ['(', x.slice(3), ')', x.slice(3, 6), '-', x.slice(6)].join('');
}
