import { Result } from "../../../../hooks/Result";

export function wrapTry<T, U>(func: (x: T) => U) {
    return function (x: T): Result<U> {
        try {
            return Result.toPass(func(x));
        } catch (error) {
            return Result.toFail((error as Error).message);
        }
    };
}
