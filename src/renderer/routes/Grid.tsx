import { useEffect, useState } from 'react';
import { SortDescriptor } from 'realm';
import { useRealmQuery } from '../hooks/useRealmQuery';
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
    const [data, setData] = useState<Array<Realm.Object & SelfStorageDTO>>([]);
    console.log('pulling data for', typeName);
    useEffect(() => {
        console.log('useEffect');
        const query = Array.from(realm.objects<SelfStorageDTO>(typeName).sorted(sort).snapshot().values());
        console.log(query);
        setData(query);
    }, [realm, sort, typeName]);
    return (
        <main className='container'>
            <table id={id} className='w-full overflow-x-scroll overflow-y-scroll'>
                <thead>
                    <GridHeaders />
                </thead>
                <tbody>
                    {(data ?? []).map((x, ix) => (
                        <TableRow typeName={typeName} index={ix} key={ix} data={x as unknown as Realm.Object & T} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}
