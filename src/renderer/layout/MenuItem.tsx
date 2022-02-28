import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../util/cn';
import { toTitleCase } from '../../common/text/toTitleCase';

export function MenuItem({ to }: { to: string }) {
    const label = toTitleCase(to.replace('-', ' '));
    const className = useCallback(({ isActive }: { isActive: boolean }) => {
        return cn(
            { 'bg-red': isActive, 'bg-blue-dark': !isActive },
            'flex px-3 py-1.5 transition-all text-white text-xl font-firaSans font-bold border border-white'
        );
    }, []);
    return (
        <NavLink className={className} to={to}>
            {label}
        </NavLink>
    );
}
