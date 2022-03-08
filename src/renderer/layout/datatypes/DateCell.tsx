import { useMemo } from 'react';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { Cell } from '../Cell';

export function DateCell({ data, name }: { data: Realm.Object & Record<string, Date>; name: string }) {
    const value = useMemo(() => getAssocPath<Date>(name, data), [name, data]);
    return <Cell>{value.toLocaleString()}</Cell>;
}
