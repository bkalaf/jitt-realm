import { Result } from "../../../hooks/Result";


export function condense<T, U>(v1: (x: T) => Result<U>, v2: (x: T) => Result<U>): (x: T) => Result<U> {
    return (x: T) => {
        const result1 = v1(x);
        if (Result.isPass(result1)) {
            return v2(x);
        }
        const result2 = v2(x);
        if (Result.isFail(result2)) {
            return Result.toFail(...result1.value, ...result2.value);
        }
        return result1;
    };
}
