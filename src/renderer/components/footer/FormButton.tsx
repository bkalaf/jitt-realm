import { useTheme } from '../../providers/useTheme';

export function FormButton({ children, ...remain }: { children?: Children } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button type='button' {...remain}>
            {children}
        </button>
    );
}
