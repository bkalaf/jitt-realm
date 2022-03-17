import { useMemo } from 'react';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { Cell } from '../Cell';

export function StringCell({ data, name }: { data: Realm.Object & Record<string, string>; name: string }) {
    const value = useMemo(() => getAssocPath<string>(name, data), [name, data]);
    return <Cell>{value}</Cell>;
}
