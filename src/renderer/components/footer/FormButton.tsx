import { useTheme } from "../../providers/useTheme";

export function FormButton({ children, ...remain }: { children?: Children } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const className = useTheme({}, '', 'form', 'insert', 'buttonGroup', 'button');
    return (
        <button type='button' className={className} {...remain}>
            {children}
        </button>
    );
}
