import { useContext, useMemo } from 'react';
import { cn } from '../util/cn';

export type ThemeValue = string | [light: string, dark: string];
export type CSSSettingKey = 'bg' | 'text' | 'border' | 'fw' | 'fs' | 'font';
export type ThemeSetting<T> = Record<string, ThemeValue | T>;
export type ThemeSet = ThemeSetting<ThemeSetting<ThemeSetting<any>>>;
export type IThemeContext = Record<string, ThemeSet>;

export const ThemeContext = React.createContext<IThemeContext | undefined>(undefined);

export function useThemeSetting(setting: Partial<Record<CSSSettingKey, ThemeValue>>, obj?: Record<string, boolean>, className?: string) {
    console.log('themeSetting', setting);
    const value = Object.values(setting)
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
export function useTheme(obj?: Record<string, boolean>, className?: string, ...path: string[]) {
    const theme = useContext(ThemeContext)!;
    const setting = useMemo(() => path.reduce((pv, cv) => pv[cv], theme as Record<string, any>), [path]);
    console.log('theme:path', path.join('.'), setting);
    const result = useThemeSetting(setting, obj, className);
    return result;
}
export function ThemeProvider({ children }: { children?: Children }) {
    const value: IThemeContext = {
        form: {
            insert: {
                grid: 'grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
                gap: 'gap-x-4 gap-y-2',
                border: 'border-2 border-black',
                bg: 'bg-yellow-minimal/50',
                text: 'text-black',
                font: 'font-raleway',
                field: {
                    label: {
                        font: 'font-raleway',
                        fs: 'text-xl',
                        fw: 'font-bold',
                        left: 'ml-3',
                        after: 'peer-required:after:content-["_(*)_"] peer-required:after:text-red after:font-extrabold'
                    },
                    input: {
                        font: 'font-firaSans',
                        fs: 'text-base',
                        fw: 'font-medium',
                        padding: 'py-1 px-3',
                        before: 'whitespace-pre before:content-["_"]',
                        border: 'border border-neutral/75',
                        shadow: 'shadow-lg',
                        rounded: 'rounded-lg',
                        transition: 'transition-all duration-700 delay-75 ease-in-out',
                        hover: 'hover:ring hover:ring-red',
                        flex: 'flex w-full',
                        peer: 'peer'
                    }
                },
                buttonGroup: {
                    width: 'flex w-full',
                    span: 'xs:col-span-2 md:col-span-3 xl:col-span-4',
                    padding: 'px-2 py-1',
                    button: {
                        flex: 'flex w-full',
                        bg: 'bg-blue-dark/75',
                        text: 'text-white',
                        pad: 'px-2 py-0.5',
                        fw: 'font-bold',
                        align: 'text-center',
                        rounded: 'rounded-md',
                        border: 'border border-white/50',
                        hover: 'hover:ring hover:ring-red',
                        disabled: 'disabled:bg-black/25 disabled:text-white/25',
                        opacity: 'disabled:opacity-25',
                        transition: 'transition-all duration-700 delay-75 ease-in-out'
                    }
                }
            }
        },
        records: {
            header: {
                bg: 'bg-black',
                text: 'text-white',
                border: 'border-white',
                fs: 'text-2xl',
                fw: 'font-bold',
                font: 'font-raleway'
            },
            table: {
                gap: 'space-x-2 space-y-1',
                divide: 'divide-x divide-dashed divide-black',
                header: {
                    bg: 'bg-bluegray-dark',
                    text: 'text-white',
                    border: 'border-white border'
                },
                row: {
                    bg: 'bg-yellow-light',
                    text: 'text-black',
                    border: 'border-black',
                    thickness: 'border-2 border-double',
                    fs: 'text-base',
                    fw: 'font-normal',
                    font: 'font-raleway',
                    even: 'even:bg-sky even:text-white',
                    odd: 'odd:bg-white odd:text-black',
                    hover: 'hover:ring hover:ring-red',
                    cell: {
                        border: 'border-dashed border border-black',
                        shadow: 'shadow-xl',
                        margin: 'ml-3 p-1',
                        rounded: 'rounded-md',
                        font: 'font-raleway',
                        hover: 'hover:ring hover:ring-offset-amber'
                    }
                }
            }
        }
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
