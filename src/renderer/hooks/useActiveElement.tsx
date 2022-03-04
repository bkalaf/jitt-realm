import { useCallback } from 'react';

export function useActiveElement<TElement extends HTMLElement>(action: (el: TElement) => void) {
    return useCallback(() => {
        const activeEl: HTMLElement | null = document.activeElement as HTMLElement | null;
        if (activeEl) {
            action(activeEl as TElement);
        }
    }, [action]);
}
