function scan<T, U>(f: (x: U, y: T) => U, init: U, arr: T[]): U {
    if (arr.length === 0) {
        return init;
    }
    const [head, ...tail] = arr;
    const next = f(init, head);
    return scan(f, next, tail);
}
