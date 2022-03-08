import { cn } from '../util/cn';

export function Cell({ children, ...remain }: { children: Children } & React.TdHTMLAttributes<HTMLTableCellElement>) {
    const className = cn(
        {
            'text-left border border-dashed border-black pl-3': true
        },
        remain.className
    );
    return (
        <td {...remain} className={className}>
            {children}
        </td>
    );
}
