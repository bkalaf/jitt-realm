import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useGoToPageOnClick(route: string | number) {
    const navigate = useNavigate();
    return useCallback(() => {
        navigate(route as any);
    }, [navigate, route]);
}
