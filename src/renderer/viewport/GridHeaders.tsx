import { useMemo } from 'react';
import { toDisplayName } from './columnList';
import { isEmbedded, useType } from './routeBase';
import { useColumns } from './useColumns';

export function foldMap<T>(m: Map<string, T>) {
    return Array.from(m.entries()).map(([k, v]) => ({ ...v, name: k }));
}

export function useCells() {
    const type = useType();
    return Reflection().getCells(type);
}
export function GridHeaders() {
    const columns = useCells();
    const columnHeaders = useMemo(() => columns.map((x) => <th key={x.displayName} scope='col'>{x.displayName}</th>), [columns]);
    return (
        <thead>
            <tr>
                {columnHeaders}
            </tr>
        </thead>
    );
}
