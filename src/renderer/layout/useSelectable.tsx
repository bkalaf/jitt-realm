import { useCallback, useState } from 'react';
import { ObjectId } from 'bson';
import { getBetween } from '../../common/array/getBetween';
import { Selectable } from './Window';

export function useSelectable(value = false): Selectable {
    const [isSelectable, setSelectable] = useState(value);
    const [selected, setSelected] = useState<ObjectId[]>([]);
    const isSelected = useCallback(
        (id: ObjectId) => {
            return selected.includes(id);
        },
        [selected]
    );
    const addToggledSelected = useCallback((item: ObjectId) => {
        setSelected((prev) => {
            if (prev.includes(item)) {
                return prev.filter((x) => x != item);
            }
            return [item, ...prev];
        });
    }, []);
    const adjustRange = useCallback((item: ObjectId) => {
        setSelected((prev) => {
            if (prev.length === 0) throw new Error('no previously selected value');
            return getBetween(item, prev[0])(prev);
        });
    }, []);
    const replaceSelected = useCallback((item: ObjectId) => {
        setSelected((prev) => {
            if (prev.includes(item)) {
                return [];
            }
            return [item];
        });
    }, []);
    return {
        isSelected,
        replaceSelected,
        adjustRange,
        addToggledSelected,
        isSelectable,
        setSelectable
    };
}
