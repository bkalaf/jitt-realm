import { useMemo } from 'react';
import { useParams } from 'react-router';
import { $$Schema, schema } from '../db/index';
import { Loading } from './Loading';
import { useRealm } from '../hooks/useRealm';
import { ObjectId } from 'bson';
import { Frame } from './Frame';
import { Boundary } from '../components/suspense/Boundary';
import { createPortal } from 'react-dom';
import { FullScreenOverlay } from '../components/portions/overlay';

export interface Selectable {
    // data: Realm.Object & {
    //     _id: ObjectId;
    // };
    isSelected: (id: ObjectId) => boolean;
    isSelectable: boolean;
    setSelectable: StateSetter<boolean>;
    addToggledSelected: (id: ObjectId) => void;
    adjustRange: (id: ObjectId) => void;
    replaceSelected: (id: ObjectId) => void;
}

export function handleProperties(pt: Realm.PropertyType | Realm.ObjectSchemaProperty | Realm.ObjectSchema) {
    if (pt == null) {
        return 'string';
    }
    if (typeof pt === 'string') {
        return pt;
    }
    if ('type' in pt) {
        return pt.type;
    }
    return pt.name;
}
export function getColumnType(name: string, type: string): string {
    if (name.includes('.')) {
        const [head, ...tail] = name.split('.');
        if (tail.length === 0) {
            return handleProperties($$Schema[type].schema.properties[head]);
        }
        const next = handleProperties($$Schema[type].schema.properties[head]);
        return getColumnType(tail.join('.'), next);
    }
    return handleProperties($$Schema[type].schema.properties[name]);
}

export default function Window() {
    const realm = useRealm();
    const portal = createPortal(<FullScreenOverlay />, document.getElementById('modal-root')!);
    return (
        <Boundary fallback={<Loading />}>
            <Frame realm={realm.reader}></Frame>
            {portal}
        </Boundary>
    );
}
