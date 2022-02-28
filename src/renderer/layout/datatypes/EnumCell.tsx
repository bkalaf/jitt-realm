import { useMemo } from 'react';
import { getAssocPath } from '../../common/obj/getAssocPath';
import { Cell } from '../Cell';

export function EnumCell({
    data,
    name,
    enumMap
}: {
    data: Realm.Object & Record<string, string>;
    name: string;
    enumMap: Record<string, string>;
}) {
    const value = useMemo(() => enumMap[getAssocPath<string>(name, data)], [name, data]);

    return <Cell>{value}</Cell>;
}
