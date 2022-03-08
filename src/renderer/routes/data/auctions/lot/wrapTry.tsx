import { Result } from '../../../../hooks/$useControl';

export function wrapTry<T, U>(func: (x: T) => U) {
    return function (x: T): Result<U> {
        try {
            return Result.toPass(func(x));
        } catch (error) {
            return Result.toFail((error as Error).message);
        }
    };
}
