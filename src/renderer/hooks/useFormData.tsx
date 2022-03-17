import { useCallback, useRef, useState } from 'react';
import { evalSet } from '@forms/evalSet';
import { evalGet } from "@forms/evalGet";
import { isEmptyOrNull } from '../util/asPercentage';

export function useFormData<T>(initial: () => T): [formData: T, getter: ISavedValueGetterFunction<T>, setter: ISavedValueSetterFunction<T>, undo: IAction, commit: IAction] {
    const [formData, setFormData] = useState(initial);
    console.log(`useFormData`, formData);
    const memoized = useRef(formData);
    const commit = useCallback(() => (memoized.current = formData), [formData]);
    const undo = useCallback(() => setFormData(memoized.current), []);
    const getter = useCallback(
        function <K extends keyof T & string>(name: K, stringify: IStringifyFunction, unsaved: string | undefined) {
            return function (): string {
                if (isEmptyOrNull(unsaved)) {
                    const result = stringify(evalGet(formData, name) as T[K]);
                    return result ?? '';
                }
                return unsaved;
            };
        },
        [formData]
    );
    const setter = useCallback(function <K extends keyof T & string>(name: K, parse: IParseFunction, setSaved: StateSetter<string>, addError: (name: string, msg: string[]) => void) {
        return function (value: string) {
            try {
                evalSet(name as any, setFormData, parse(value));
                setSaved('');
            } catch (error) {
                const err = error as Error;
                addError(name, [err.message]);
                setSaved(value);
            }
        };
    }, []);
    return [formData, getter, setter, undo, commit];
}
