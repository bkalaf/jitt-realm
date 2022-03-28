import { isEmbedded } from './routeBase';

export interface ICons<T> {
    type: 'cons';
    head: T;
    tail: List<T>;
}
export interface IEmptyList {
    type: 'empty-list';
}
export type List<T> = ICons<T> | IEmptyList;

export const List = {
    is: {
        cons: function <T>(item: List<T>): item is ICons<T> {
            return item.type === 'cons';
        },
        empty: function <T>(item: List<T>): item is IEmptyList {
            return item.type === 'empty-list';
        }
    },
    to: {
        cons: function <T>(x: T, list: List<T> = { type: 'empty-list' }): List<T> {
            return { type: 'cons', head: x, tail: list };
        },
        empty: function <T>(): List<T> {
            return { type: 'empty-list' };
        }
    }
};
const toList = function<T>(arr: T[]): List<T> {
    if (arr.length === 0) return List.to.empty();
    const [head, ...tail] = arr;
    return List.to.cons(head, toList(tail));
}
const toArray = function<T>(arr: List<T>): T[] {
    if (List.is.empty(arr)) { return []; }
    const { head, tail } = arr;
    return [head, ...toArray(tail)];
}
export function fromTypeInfo(x: TypeData): Array<ColumnData & { columnName: string }> {
    const fields = Array.from(x.fields.entries()).map(([k, v]) => ({ ...v, columnName: k })).sort((a, b) => a.index === b.index ? 0 : a.index < b.index ? -1 : 1);
    const jagged = fields.map(x => isEmbedded(x.type) ? fromTypeInfo(getTypeInfo(x.type[2] ?? '')) : [x]);
    const result = jagged.reduce((pv, cv) => [...pv, ...cv], []);
    return result;
}

export const toDisplayName = (x: TypeData) => fromTypeInfo(x).map(x => x.displayName);
export const toColumnName = (x: TypeData) => fromTypeInfo(x).map(x => x.columnName);