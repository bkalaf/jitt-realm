import { ObjectId } from 'bson';
import { Selectable } from './Window';
import { useRealmSchema } from './useRealmSchema';
import { useRecordType } from './useRecordType';
import { useMemo } from 'react';
import { TableRow } from './TableRow';
import { RecordSetHeader } from './RecordSetHeader';
import { useTheme } from '../providers/ThemeProvider';

export function RecordSet<T extends Objects, TElement extends DataEntryElement>({
    realm,
    isSelectable,
    setSelectable,
    isSelected,
    addToggledSelected,
    adjustRange,
    replaceSelected
}: {
    realm: Realm;
    isSelectable: boolean;
    setSelectable: StateSetter<boolean>;
    isSelected: (oid: ObjectId) => boolean;
    adjustRange: (item: ObjectId) => void;
    addToggledSelected: (item: ObjectId) => void;
    replaceSelected: (item: ObjectId) => void;
}) {
    const [type, { sort }] = useRecordType<T>();
    const { getColumnsInfo, getColumnsList } = useRealmSchema(realm);
    const columns = getColumnsList(type);
    const headers = useMemo(() => columns.map((x) => x.displayName), [columns]);
    const cells = useMemo(() => columns.map((x) => x.columnName), [columns]);
    const data = realm.objects<{ _id: ObjectId }>(type).sorted(sort);
    const infos = useMemo(() => getColumnsInfo<TElement>(type), [getColumnsInfo, type]);
    const selectable = useMemo((): Selectable => ({
        isSelectable,
        isSelected,
        setSelectable,
        addToggledSelected,
        adjustRange,
        replaceSelected
    }), [isSelectable, isSelected, setSelectable, addToggledSelected, adjustRange, replaceSelected])
    // const toggleSelected = useCallback((id: ObjectId) => {
    //     setSelected(prev => {
    //         if (prev.includes(id)) {
    //             return prev.filter(x => x !== id)
    //         }
    //         return [...prev, id];
    //     })
    // }, []);
    const className = useTheme({}, 'overflow-x-scroll overflow-y-scroll', 'records', 'table');
    return (
        <table className={className}>
            <RecordSetHeader isSelectable={isSelectable} headers={headers} />
            <tbody>
                {data.map((d, ix) => (
                    <TableRow key={ix} infos={infos} selectable={selectable} cells={cells} data={d as any} realm={realm}></TableRow>
                    // <Row
                    //     key={ix}
                    //     data={d}
                    //     isSelectable={isSelectable}
                    //     isSelected={isSelected}
                    //     addToggledSelected={addToggledSelected}
                    //     adjustRange={adjustRange}
                    //     replaceSelected={replaceSelected}
                    //     setSelectable={setSelectable}
                    //     columns={cells}
                    //     columnMap={infos}
                    // />
                ))}
            </tbody>
        </table>
    );
}
