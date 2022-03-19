import { useEffect, useState } from 'react';
import { SortDescriptor } from 'realm';
import { FacilityDTO } from './data/auctions/facility';
import { SelfStorageDTO } from './data/auctions/selfStorage/index';

export function Grid<T>({
    typeName,
    GridHeaders,
    realm,
    sort,
    TableRow
}: {
    realm: Realm;
    typeName: string;
    sort: SortDescriptor[];
    GridHeaders: React.FunctionComponent<any>;
    TableRow: React.FunctionComponent<{ typeName: string; data: Realm.Object & T; index: number }>;
}) {
    const id = `${typeName}-grid`;
    const [data, setData] = useState<Array<Realm.Object & T>>([]);
    console.log('pulling data for', typeName);
    useEffect(() => {
        console.log('useEffect');
        const query = Array.from(realm.objects<FacilityDTO>(typeName).sorted(sort));
        console.log(`query`, query);
        setData(query as any);
    }, [realm, sort, typeName]);
    return (
        <main className=''>
            <table id={id} className='w-full overflow-x-scroll overflow-y-scroll'>
                <thead>
                    <GridHeaders />
                </thead>
                <tbody>
                    {(data ?? []).map((x, ix) => {
                        console.log(`data`, x, `ix`, ix);
                        return <TableRow typeName={typeName} index={ix} key={ix} data={x as unknown as Realm.Object & T} />;
                    })}
                </tbody>
            </table>
        </main>
    );
}
