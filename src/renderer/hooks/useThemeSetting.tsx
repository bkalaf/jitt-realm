// @flow
import { useMemo } from 'react';
import { cn } from '../util/cn';
import { CSSSettingKey, ThemeValue } from '../providers/ThemeProvider';

/**
 * @deprecated
 */
export function useThemeSetting(setting: Partial<Record<CSSSettingKey, ThemeValue>>, obj?: Record<string, boolean>, className?: string) {
    // console.log('themeSetting', setting);
    const value = Object.values(setting ?? {})
        .map((x) => {
            if (Array.isArray(x)) {
                const [light, dark] = x;
                return [light, `dark:${dark}`].join(' ');
            }
            if (typeof x === 'string') {
                return x;
            }
            return null;
        })
        .filter((x) => x != null)
        .join(' ');
    const $className = useMemo(() => cn(obj ?? {}, [className, value].join(' ').trim()), [obj, className, value]);
    return $className;
}
