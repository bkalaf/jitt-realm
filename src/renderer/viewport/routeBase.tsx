import { useDebugValue } from 'react';
import { Outlet, useParams } from 'react-router';
import { Grid } from '../routes/Grid';
import { NewEmbeddedContext } from '../routes/providers/EmbeddedContext';
import { Row } from './Row';
import { GridHeaders } from './GridHeaders';
import { DBAudit } from '../models/embedded/Audit/DBAudit';

export function RouteBase({ realm }: { realm: Realm }) {
    const { type } = useParams();
    if (type == null || type?.length === 0) throw new Error(`Empty Type`);
    realm.objects(type).addListener((collection, changes) => {
        changes.deletions.map((index) => {
            const audit = new DBAudit();
            
        })
    })
    return (
        <NewEmbeddedContext realm={realm} type={type}>
            <Outlet />
        </NewEmbeddedContext>
    );
}

export const isEmbedded = (ct: ColumnType) => ct[1] === 'object' && getTypeInfo(ct[2] ?? '').embedded;

export function useTypeInfo() {
    const type = useType();
    return Reflection().getTypeInfo(type);
}

export function GridRoute({ realm }: { realm: Realm }) {
    const info = useTypeInfo();
    const { sort, fields } = info;
    useDebugValue(JSON.stringify(info));

    return <Grid typeName={info.typeName} sort={sort} GridHeaders={() => <GridHeaders />} TableRow={({ typeName, data, index }) => <Row key={index} data={data as any} />} realm={realm} />;
}

const toTel = (x: string) => ['(', x.substring(0, 3), ')', x.substring(3, 6), '-', x.substring(6)].join('');

export function useType(): string {
    const { type } = useParams();
    if (type == null || type?.length === 0) throw new Error(`Empty Type`);
    return type;
}
