import { useMemo } from 'react';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { Cell } from '../Cell';

export function IntCell({ data, name }: { data: Realm.Object & Record<string, number>; name: string }) {
    const value = useMemo(() => getAssocPath<number>(name, data), [name, data]);
    return <Cell>{value.toFixed(0)}</Cell>;
}
