import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { $$Schema, schema } from '../db/index';
import { Loading } from './Loading';
import { useRealm } from '../hooks/useRealm';
import { ObjectId } from 'bson';
import { Frame } from './Frame';
import { Boundary } from '../components/suspense/Boundary';

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

export function useObjectClass() {
    const { type } = useParams();
    const objectClass = useMemo(() => schema.filter((x) => x.schema.name === type)[0], [type]);
    return objectClass;
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
export function getRealmObjectPropertyType(oc: JittClass<any>, name: string): [string, string?] {
    console.log('oc', oc, 'name', name);
    const property = oc.schema.properties[name];
    if (property == null) return ['string'];
    if (typeof property === 'string') return [property];
    if ('type' in property) {
        return property.objectType ? [property.objectType, property.type] : [property.type];
    }
    return [property.name];
}
export function useGetPropertyType() {
    const objectClass = useObjectClass();
    const getPropertyType = useCallback(
        (n: string): [string, string?] => {
            console.log('n', n);
            const [head, ...tail] = n.includes('.') ? n.split('.') : [n];
            if (tail.length === 0) {
                return getRealmObjectPropertyType(objectClass, head);
            }
            const [t] = getRealmObjectPropertyType(objectClass, head);
            return getRealmObjectPropertyType(schema.filter((x) => x.schema.name === t)[0], tail.join('.'));
        },
        [objectClass]
    );
    return getPropertyType;
}
export default function Window() {
    const realm = useRealm();
    return (
        <Boundary fallback={<Loading />}>
            <Frame realm={realm.reader}></Frame>
        </Boundary>
    );
}
