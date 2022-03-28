export function find<T>(predicate: Predicate<T>, arr: T[]): any {
    return arr.length === 0 ? {} : arr.filter(predicate)[0];
}
