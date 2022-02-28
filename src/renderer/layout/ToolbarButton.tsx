import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { cn } from '../util/cn';

export function ToolbarButton({
    className,
    icon,
    size,
    title,
    ...remain
}: { icon: IconDefinition; size?: SizeProp; title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const $className = cn({ 'bg-white text-blue-dark': true, className: true }, 'm-1 inline-flex disabled:opacity-20');
    return (
        <button className={$className} type='button' title={title} {...remain}>
            <FontAwesomeIcon icon={icon} size={size} />
        </button>
    );
}
