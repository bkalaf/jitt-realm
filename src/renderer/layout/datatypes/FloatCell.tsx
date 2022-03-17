import { useMemo } from 'react';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { Cell } from '../Cell';

export function FloatCell({ data, name, scale }: { data: Realm.Object & Record<string, number>; name: string; scale?: number }) {
    const value = useMemo(() => getAssocPath<number>(name, data), [name, data]);
    return <Cell>{value.toFixed(scale ?? 4)}</Cell>;
}
