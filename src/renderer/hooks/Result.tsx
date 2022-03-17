export type Result<T> = IFail | IPass<T>;
export interface IPass<T> {
    kind: 'pass';
    value: T;
}
export interface IFail {
    kind: 'fail';
    value: string[];
}
export const Result = {
    isPass<T = any>(item: Result<T>): item is IPass<T> {
        return item.kind === 'pass';
    },
    isFail<T = any>(item: Result<T>): item is IFail {
        return item.kind === 'fail';
    },
    toPass<T>(value: T): Result<T> {
        return { kind: 'pass', value };
    },
    toFail<T>(...messages: string[]): Result<T> {
        return { kind: 'fail', value: messages };
    }
};