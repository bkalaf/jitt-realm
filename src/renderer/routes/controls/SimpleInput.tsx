import { useCallback } from 'react';
import { cn } from '../../util/cn';

export function SimpleInput({ value, name, setValue, className, displayName }: { className: string; value: any; setValue: StateSetter<any>; name: string; displayName: string }) {
    const toID = (...prefix: string[]) => [name, ...prefix].join('-');
    const fieldCn = cn({ className: true }, 'field');
    const onChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setValue(ev.target.value);
        },
        [setValue]
    );
    return (
        <div className={fieldCn} id={toID('field')}>
            <input className='control' id={toID('input')} aria-labelledby={toID('input', 'label')} value={value} onChange={onChange} />
            <label id={toID('input', 'label')} htmlFor={toID('input')}>
                {displayName}
            </label>
        </div>
    );
}
