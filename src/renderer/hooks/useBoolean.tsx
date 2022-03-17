import { useCallback, useState } from 'react';

export function useBoolean(init = false): [state: boolean, turnOn: () => void, turnOff: () => void] {
    const [state, setState] = useState(init);
    const turnOn = useCallback(() => setState(true), []);
    const turnOff = useCallback(() => setState(false), []);
    return [state, turnOn, turnOff];
}
