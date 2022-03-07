import { useTheme } from "../../providers/useTheme";

export function ButtonGroup({ children }: { children?: Children }) {
    const className = useTheme({}, 'w-1/2 transform translate-x-1/2', 'form', 'insert', 'buttonGroup');
    return <div className={className}>{children}</div>;
}
