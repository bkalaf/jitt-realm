import React from 'react';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../util/cn';

export function Indicator({ icon, isFlag, title, bg }: { icon: IconDefinition; isFlag?: boolean; title: string; bg?: string }) {
    const flag = isFlag ?? false;
    const className = cn({ hidden: !flag, 'inline-flex': flag, [bg ?? 'bg-red']: true }, `p-1  border-2 border-black rounded-2xl shadow-lg text-white`);
    const iconCn = cn({ [bg ?? 'bg-red']: true });
    return (
        <span className={className} title={title}>
            <FontAwesomeIcon size='sm' icon={icon} className={iconCn}></FontAwesomeIcon>
        </span>
    );
}
