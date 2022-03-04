import { useMemo } from 'react';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { Cell } from "../Cell";

export function ListCell({ data, name }: { data: Realm.Object & Record<string, any[]>; name: string; }) {
    const value = useMemo(() => getAssocPath<any[]>(name, data), [name, data]);
    return (
        <Cell>
            <ul className='inline-flex flex-col'>
                {value.map((x, ix) => (
                    <li key={ix} className='border border-black inline-flex'>
                        {typeof x === 'string' ? x : x.toString()}
                    </li>
                ))}
            </ul>
        </Cell>
    );
}
