import { useType } from './routeBase';

export function useColumns() {
    const type = useType();
    return Reflection().getColumns(type);
}
