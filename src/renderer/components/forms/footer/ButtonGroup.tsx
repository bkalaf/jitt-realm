import { useTheme } from "../../../providers/useTheme";

export function ButtonGroup({ children }: { children?: Children }) {
    const className = useTheme({}, '', 'form', 'insert', 'buttonGroup');
    return <div className={className}>{children}</div>;
}
