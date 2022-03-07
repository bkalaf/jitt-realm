import { useMemo } from 'react';
import { $useThemeClassNames } from '../../db/SelfStorage';
import { camelToTitleCase } from '../../../common/text/camelToTitleCase';
import { faCalculator } from '@fortawesome/pro-solid-svg-icons';
import { Indicator } from '../../db/Indicator';
import { toSpan } from '../data/auctions/facility/toSpan';

export function OutputControl({ getter, display, name, span }: { display?: string, name: string; getter?: (x: string) => any; span?: number }) {
    const inputCn = $useThemeClassNames('control');
    const labelCn = $useThemeClassNames('label');
    const divCn = $useThemeClassNames('container');
    const controlID = `${name}-output`;
    const value = useMemo(() => (getter ? getter(name) : 'n/a'), [getter, name]);
    const displayName = display ? display : camelToTitleCase(name);
    return (
        <div className={[divCn, ...toSpan(span)].join(' ')}>
            <input readOnly value={value} id={controlID} className={inputCn} />
            <label className={labelCn} htmlFor={controlID}>
                {displayName}
                <span className='absolute top-0 right-0 flex flex-row space-x-2'>
                    <Indicator icon={faCalculator} title='Field is calculated.' isFlag={true} bg='bg-blue' />
                </span>
            </label>
        </div>
    );
}
