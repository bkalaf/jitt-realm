import { useMemo } from 'react';
import { Cell } from './Cell.1';
import { toColumnName } from './columnList';
import { isEmbedded, useType } from './routeBase';

export function Row({ data }: { data: Realm.Object & Record<string, any> }) {
    const type = useType();

    const columns = useMemo(() => Reflection().getCells(type).map(x => ({ name: x.columnName, info: x })), [type]);
    
    return (
        <tr>
            {columns.map((x) => (
                <Cell key={x.name} data={data} {...x} />
            ))}
        </tr>
    );
}
