import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ObjectId } from 'bson';
import { Selectable } from './Window';
import { toPropertyProps } from './toPropertyProps';
import { ColumnInfoMap } from './useRealmSchema';
import { useCallback, useMemo } from 'react';
import { cn } from '../util/cn';
import { Cell } from './Cell';
import { CellSwitcher } from './datatypes/CellSwitcher';
import { DropdownCell } from './datatypes/DropdownCell';
import { useTheme } from "../providers/useTheme";

export function TableRow<T extends Objects, TElement extends DataEntryElement>({
    infos,
    selectable,
    cells,
    data,
    realm
}: {
    infos: ColumnInfoMap<TElement>;
    selectable: Selectable;
    cells: string[];
    data: Realm.Object & ClassObject<T>;
    realm: Realm;
}) {
    const { isSelected, isSelectable, addToggledSelected, adjustRange, replaceSelected } = selectable;
    const record = data as any as { _id: ObjectId };

    console.log('id', record._id, record._id.toHexString(), data._objectId());
    const id = useMemo(() => new ObjectId(record._id), [data._objectId]);
    const selected = useMemo(() => isSelected(id), [isSelected, id]);
    const selectIcon = useMemo(() => (selected ? faCheckSquare : faSquare), [isSelected, id]);

    const className = useTheme(
        {
            'bg-pink!important': selected
        },
        '',
        'records',
        'table',
        'row'
    );
    const onClick = useCallback(
        (ev: React.MouseEvent<HTMLElement>) => {
            if (ev.ctrlKey) {
                addToggledSelected(id);
            } else if (ev.shiftKey) {
                adjustRange(id);
            } else {
                replaceSelected(id);
            }
        },
        [isSelectable, addToggledSelected, id]
    );

    return (
        <tr className={className} data-id={id.toHexString()}>
            {isSelectable && (
                <Cell onClick={onClick}>
                    <FontAwesomeIcon icon={selectIcon} size='1x' />
                </Cell>
            )}
            {cells.map((columnName, index) => {
                const key = isSelectable ? index + 1 : index;
                const { name, datatype, enumMap, func, calculated, ...props } = toPropertyProps(
                    infos.get(columnName)!
                ) as IPropertyProps<TElement>;
                if (enumMap != null && Object.keys(enumMap).length > 0) {
                    return (
                        <DropdownCell
                            key={key}
                            data={data}
                            realm={realm}
                            name={columnName}
                            datatype={datatype as any}
                            enumMap={enumMap}
                            {...(props as Omit<IPropertyProps<HTMLSelectElement>, 'enumMap' | 'datatype' | 'name'>)}
                        />
                    );
                }
                if ('type' in props) {
                    return (
                        <CellSwitcher
                            datatype={datatype as any}
                            key={key}
                            data={data as any}
                            name={name}
                            func={func}
                            calculated={calculated ?? false}
                            {...(props as Partial<React.InputHTMLAttributes<HTMLInputElement>>)}
                        />
                    );
                }
                if ('icon' in props) {
                    return (
                        <CellSwitcher
                            datatype={datatype as any}
                            key={key}
                            data={data as any}
                            name={name}
                            func={func}
                            calculated={calculated ?? false}
                            {...(props as Partial<React.InputHTMLAttributes<HTMLInputElement>>)}
                        />
                    );
                }
                return (
                    <CellSwitcher
                        datatype={datatype as any}
                        key={key}
                        data={data as any}
                        name={name}
                        func={func}
                        calculated={calculated ?? false}
                        {...(props as Partial<React.InputHTMLAttributes<HTMLInputElement>>)}
                    />
                );
            })}
        </tr>
    );
}
