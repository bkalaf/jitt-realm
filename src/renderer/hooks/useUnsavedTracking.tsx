// @flow
import { useCallback, useState } from 'react';

export function useUnsavedTracking(): [unsavedValue: string | undefined, setUnsaved: StateSetter<string | undefined>, clearUnsaved: IAction, isUnsaved: IBinaryPredicate] {
    const [unsavedValue, setUnsavedValue] = useState<string | undefined>(undefined);
    const isUnsaved = useCallback(() => unsavedValue != null && unsavedValue.length > 0, [unsavedValue]);
    const clearUnsaved = useCallback(() => {
        setUnsavedValue(undefined);
    }, []);
    return [unsavedValue, setUnsavedValue, clearUnsaved, isUnsaved];
}
