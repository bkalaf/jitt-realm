import { useMemo } from 'react';
import { Cell } from '../Cell';

export function CalculatedCell({ data, func }: { data: Realm.Object & Record<string, string>; func: string }) {
    const value = useMemo(() => eval(func)(data), [func, data]);
    return <Cell>{value}</Cell>;
}
