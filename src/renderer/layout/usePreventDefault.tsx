import { useCallback } from 'react';




export function usePreventDefault<T extends React.SyntheticEvent>() {
    return useCallback((ev: T) => {
        ev.preventDefault();
        ev.stopPropagation();
    }, []);
}
