import { useTheme } from '../../providers/useTheme';

export function FormButton({ children, ...remain }: { children?: Children } & React.ComponentPropsWithoutRef<'button'>) {
    return (
        <button type='button' {...remain}>
            {children}
        </button>
    );
}
