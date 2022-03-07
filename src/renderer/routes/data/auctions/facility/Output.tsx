import { useMemo } from 'react';
import { $useThemeClassNames } from '../../../../db/SelfStorage';
import { camelToTitleCase } from '../../../../../common/text/camelToTitleCase';
import { faCalculator } from '@fortawesome/pro-solid-svg-icons';
import { Indicator } from '../../../../db/Indicator';


export function toSpan(span?: number) {
    switch (span) {
        case undefined:
            return [];
        case 1: 
            return [];
        case 2: 
            return ['col-span-2'];
        case 3:
            return ['col-span-3'];
        case 4:
            return ['col-span-4'];
    
        default:
            return [];
    }
}
export function Output({ getter, name, span }: { name: string; getter?: (x: string) => any; span?: number }) {
    const inputCn = $useThemeClassNames('control');
    const labelCn = $useThemeClassNames('label');
    const divCn = $useThemeClassNames('container');
    const controlID = `${name}-output`;
    const value = useMemo(() => (getter ? getter(name) : 'n/a'), [getter, name]);
    const displayName = camelToTitleCase(name);
    return (
        <div className={[divCn, ...toSpan(span)].join(' ')}>
            <input readOnly value={value} id={controlID} className={inputCn}/>
            <label className={labelCn} htmlFor={controlID}>
                {displayName}
                <span className='absolute top-0 right-0 flex flex-row space-x-2'>
                    <Indicator icon={faCalculator} title='Field is calculated.' isFlag={true} bg='bg-blue' />
                </span>
            </label>
        </div>
    );
}
