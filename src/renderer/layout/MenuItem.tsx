import { useCallback, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../util/cn';
import { toTitleCase } from '../../common/text/toTitleCase';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function MenuItem({ to, icon, onClick, tooltip }: { onClick?: () => void; icon?: IconDefinition; to?: string; tooltip?: string }) {
    const [active, setActive] = useState(false);
    const label = toTitleCase(to?.replace('-', ' '));
    const className = useCallback(
        ({ isActive }: { isActive: boolean }) => {
            if (active !== isActive) setActive(isActive);
            return cn({ 'bg-red': isActive, 'bg-blue-dark': !isActive }, 'flex transition-all text-white text-lg font-firaSans font-bold');
        },
        [active]
    );
    const buttonCn = useMemo(
        () =>
            cn(
                { 'bg-red': active, 'bg-blue-dark': !active },
                'flex py-0.5 px-3 text-white border-2 border-white rounded-lg shadow-lg items-center justify-center text-lg'
            ),
        [active]
    );
    const linkCn = cn({ 'border-2': false, 'border-white': false }, buttonCn);
    console.log('linkCn', linkCn);
    return (
        <button className={buttonCn} type='button' title={tooltip} onClick={onClick}>
            <Link className={linkCn} to={to ?? ''}>
                {icon == null ? label : <FontAwesomeIcon icon={icon} />}
            </Link>
        </button>
    );
}
