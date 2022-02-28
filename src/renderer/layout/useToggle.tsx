import { useCallback, useState } from 'react';

export function useToggle(init = false): [is: boolean, toggle: () => void] {
    const [state, setState] = useState(init);
    const toggleState = useCallback(() => {
        setState((prev) => !prev);
    }, []);
    return [state, toggleState];
}
