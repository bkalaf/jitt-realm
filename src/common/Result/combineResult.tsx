import { Result } from '../../renderer/hooks/$useControl';

export function combineResult<T>(pv: Result<T>, cv: Result<T>): Result<string | T> {
    if (Result.isPass(pv) && Result.isPass(cv)) {
        return Result.toPass('');
    } else if (Result.isFail(pv) && Result.isFail(cv)) {
        return Result.toFail(...pv.value, ...cv.value);
    } else if (Result.isFail(pv)) return pv;
    return cv;
}
export function combineResultFirst<T>(pv: Result<T>, cv: Result<T>): Result<T> {
    if (Result.isPass(pv) && Result.isPass(cv)) {
        return pv;
    } else if (Result.isFail(pv) && Result.isFail(cv)) {
        return Result.toFail(...pv.value, ...cv.value);
    } else if (Result.isFail(pv)) return pv;
    return cv;
}