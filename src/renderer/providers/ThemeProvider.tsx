export type ThemeValue = string | [light: string, dark: string];
export type CSSSettingKey = 'bg' | 'text' | 'border' | 'fw' | 'fs' | 'font';
export type ThemeSetting<T> = Record<string, ThemeValue | T>;
export type ThemeSet = ThemeSetting<ThemeSetting<ThemeSetting<any>>>;
export type IThemeContext = Record<string, ThemeSet>;

export const ThemeContext = React.createContext<IThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: { children?: Children }) {
    const value: IThemeContext = {
        form: {
            insert: {
                grid: 'grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
                gap: 'gap-x-4 gap-y-2',
                border: 'border-2 border-black',
                bg: 'bg-lime-minimal/50',
                text: 'text-black',
                font: 'font-firaSans',
                field: {
                    container: {
                        bg: 'bg-white/75',
                        padding: 'pb-4',
                        justify: 'justify-center',
                        margin: 'p-1',
                        col: 'flex flex-col-reverse',
                        relative: 'relative'
                    },
                    fieldset: {
                        relative: 'relative',
                        bg: 'bg-amber/75',
                        padding: 'pb-2',
                        margin: 'px-1 py-0.5',
                        span: 'xs:col-span-2 md:col-span-3 xl:col-span-4',
                        grid: 'grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3',
                        justify: 'justify-center',
                        minwidth: 'min-w-full'
                    },
                    legend: {
                        bg: 'bg-black',
                        text: 'text-white',
                        rounded: 'rounded-xl shadow-xl',
                        minwidth: 'min-w-full',
                        padding: 'px-2 py-1.5',
                        fs: 'text-xl font-firaSans font-bold'
                    },
                    label: {
                        font: 'font-firaSans',
                        fs: 'text-xl',
                        fw: 'font-bold',
                        left: 'ml-8',
                        bottom: 'mb-2.5',
                        width: 'min-w-full text-left',
                        after: 'peer-required:after:font-openSans peer-required:after:content-["__(*)_"] peer-required:after:text-red-dark after:font-extrabold'
                    },
                    control: {
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
                        flex: 'flex',
                        peer: 'peer',
                        width: 'min-w-full',
                        textopts: 'placeholder:bg-red',
                        select: {},
                        input: {},
                        textarea: {}
                    },
                    feedback: {
                        text: 'text-red',
                        font: 'font-monteserrat font-extrabold text-lg text-center',
                        flex: 'inline-flex place-self-center'
                    }
                },
                buttonGroup: {
                    width: 'grid grid-cols-3 mx-auto w-full',
                    span: 'xs:col-span-2 md:col-span-3 xl:col-span-4',
                    padding: 'px-2 py-1',
                    bg: 'mx-auto bg-white',
                    center: 'items-center',
                    spacing: 'gap-x-6',
                    button: {
                        flex: 'flex w-full',
                        bg: 'bg-blue-dark/75',
                        text: 'text-white',
                        pad: 'px-2 py-0.5',
                        fw: 'font-bold',
                        align: 'text-center items-center justify-center mx-auto',
                        rounded: 'rounded-md',
                        border: 'border-2 border-black/50',
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
                font: 'font-firaSans'
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
                    font: 'font-firaSans',
                    even: 'even:bg-sky even:text-white',
                    odd: 'odd:bg-white odd:text-black',
                    hover: 'hover:ring hover:ring-red',
                    cell: {
                        border: 'border-dashed border border-black',
                        shadow: 'shadow-xl',
                        margin: 'ml-3 p-1',
                        rounded: 'rounded-md',
                        font: 'font-firaSans',
                        hover: 'hover:ring hover:ring-offset-amber'
                    }
                }
            }
        }
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
