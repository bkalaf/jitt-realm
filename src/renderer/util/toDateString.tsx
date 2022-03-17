import { Result } from "../hooks/Result";
import { wrapTry } from '../routes/data/auctions/lot/wrapTry';

export function stringifyDate(date: Date): string {
    const m = date.getMonth().toFixed(0).padStart(2, '0');
    const d = date.getDay().toFixed(0).padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
}
export function parseDate(date: string) {
    return new Date(Date.parse(date));
}

export function tryToDateString(date: Date) {
    try {
        const result = stringifyDate(date);
        return Result.toPass(result);
    } catch (error) {
        return Result.toFail((error as Error).message);
    }
}
export const tryParseDate = wrapTry(parseDate);
export const tryStringifyDate = wrapTry(stringifyDate);
