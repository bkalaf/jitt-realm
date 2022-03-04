import { useMemo } from 'react';
import { Cell } from "../Cell";

export function LookupCell<T extends { _id: string; }>({ data, name, schema }: { data: Realm.Object & T; name: string; schema: JittClass<any>; }) {
    const displayName = useMemo(() => schema.toDisplayName((data as any)[name] ), [schema, data, name]);
    return <Cell>{displayName}</Cell>;
}
