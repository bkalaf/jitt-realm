export function createFrom<T extends any[], U>(x: (...args: T) => U, qty: number, ...args: T): U[] {
    if (qty === 0) {
        return [];
    }
    return [x(...args), ...createFrom(x, qty - 1, ...args)];
}
