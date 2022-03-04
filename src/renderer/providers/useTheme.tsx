import { useContext, useMemo } from 'react';
import { useThemeSetting } from '../hooks/useThemeSetting';
import { ThemeContext } from './ThemeProvider';


export function useTheme(obj?: Record<string, boolean>, className?: string, ...path: string[]) {
    const theme = useContext(ThemeContext)!;
    const setting = useMemo(() => path.reduce((pv, cv) => pv[cv], theme as Record<string, any>), [path]);
    // console.log('theme:path', path.join('.'), setting);
    const result = useThemeSetting(setting, obj, className);
    return result;
}
