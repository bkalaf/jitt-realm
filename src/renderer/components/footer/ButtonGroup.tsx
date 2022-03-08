import { useTheme } from '../../providers/useTheme';

export function ButtonGroup({ children }: { children?: Children }) {
    return <div className='button-group'>{children}</div>;
}
