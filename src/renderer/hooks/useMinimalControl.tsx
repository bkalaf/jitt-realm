import { useCallback } from 'react';
import { useEmbedded } from './useEmbedded';
import { replaceAll } from '../../common/text/replaceAll';
import { isEmptyOrNull } from '../util/asPercentage';
import { caps } from '../../common/text/caps';

export function useMinimalControl(formName: string, name: string, dp?: string) {
    const { prefix } = useEmbedded();
    const fullName = [...prefix, name].join('.');
    const displayName = isEmptyOrNull(dp) ? replaceAll('-', ' ')(name).split(' ').map(caps).join(' ') : dp;
    const toID = useCallback(
        (...suffix: string[]) => {
            return [formName ?? '', name, ...suffix].join('-');
        },
        [formName, name]
    );
    return { fullName, displayName, toID };
}
