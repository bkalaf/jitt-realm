import React from 'react';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../util/cn';

export function Indicator({ icon, isFlag, title }: { icon: IconDefinition; isFlag?: boolean; title: string }) {
    const flag = isFlag ?? false;
    const className = cn(
        { hidden: !flag, 'inline-flex': flag },
        'inline-flex p-1 bg-red border-2 border-black rounded-2xl shadow-lg text-white'
    );
    return (
        <span className={className} title={title}>
            <FontAwesomeIcon size='lg' icon={icon} className=''></FontAwesomeIcon>
        </span>
    );
}
