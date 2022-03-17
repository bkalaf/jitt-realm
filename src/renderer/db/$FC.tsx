import React from 'react';
import { identity } from '../../common/identity';
import { objectMap } from '../../common/object/objectMap';
import { $$Elements } from './$$Elements';

/**
 * @deprecated
 */
export const ForwardComponents: Record<keyof typeof $$Elements, React.ForwardRefExoticComponent<Pick<any, string | symbol | number> & React.RefAttributes<HTMLElement>>> = objectMap(
    $$Elements,
    identity,
    (x) => React.forwardRef(x)
);