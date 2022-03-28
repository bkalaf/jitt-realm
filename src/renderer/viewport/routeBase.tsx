import { useDebugValue } from 'react';
import { Outlet, useParams } from 'react-router';
import { Grid } from '../routes/Grid';
import { NewEmbeddedContext } from '../routes/providers/EmbeddedContext';
import { Row } from './Cell';
import { GridHeaders } from './GridHeaders';

export function RouteBase({ realm }: { realm: Realm }) {
    const { type } = useParams();
    if (type == null || type?.length === 0) throw new Error(`Empty Type`);
    return (
        <NewEmbeddedContext realm={realm} type={type}>
            <Outlet />
        </NewEmbeddedContext>
    );
}

export const isEmbedded = (ct: ColumnType) => ct[1] === 'object' && getTypeInfo(ct[2] ?? '').embedded;

export function GridRoute({ realm }: { realm: Realm }) {
    const type = useType();
    const info = Reflection().getTypeInfo(type);
    const { sort, fields } = info;
    useDebugValue(JSON.stringify(info));
    // Array.from(fields.entries()).map(([k, v]) => {
    //     console.log(k);
    //     console.log(v);
    //     if (isEmbedded(v.type)) {
    //         alert(`embedded: ${k} ${v.displayName}`);
    //     }
    // });
    return <Grid typeName={type} sort={sort} GridHeaders={() => <GridHeaders />} TableRow={({ typeName, data, index }) => <Row key={index} data={data} />} realm={realm} />;
}

const toTel = (x: string) => ['(', x.substring(0, 3), ')', x.substring(3, 6), '-', x.substring(6)].join('');

export function useType(): string {
    const { type } = useParams();
    if (type == null || type?.length === 0) throw new Error(`Empty Type`);
    return type;
}
