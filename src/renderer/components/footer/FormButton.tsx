import { useTheme } from '../../hooks/useTheme';

export function FormButton({ children, ...remain }: { children?: Children } & React.ComponentPropsWithoutRef<'button'>) {
    return (
        <button type='button' {...remain}>
            {children}
        </button>
    );
}
