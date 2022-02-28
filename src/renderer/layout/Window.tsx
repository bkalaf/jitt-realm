import { useCallback, useMemo, useRef } from 'react';
import { Outlet, useLocation, useParams } from 'react-router';
import { DataReader } from '../../common/resource';
import { Boundary } from '../components/Boundary';
import { $$Schema, schema } from '../db';
import { Loading } from './App';
import { useRealm } from '../hooks/useRealm';
import { ObjectId } from 'bson';
import { stringify } from 'querystring';
import { type } from 'os';
import { unique } from '../../common/array/unique';
import { Menu } from './Menu';
import { Viewport } from './Viewport';

export type PropertyInfo = {
    index: number;
    title: React.ReactNode;
    attributes: ColumnAttributes;
} & Realm.ObjectSchemaProperty;
export type PropertyMap = Map<string, PropertyInfo>;
export type ColumnMap = [{ isEmbedded: boolean; isLookup: boolean }, PropertyMap];

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
        return pt
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
            return handleProperties($$Schema[type].schema.properties[head])
        }
        const next = handleProperties($$Schema[type].schema.properties[head])
        return getColumnType(tail.join('.'), next);
    }
    return handleProperties($$Schema[type].schema.properties[name])
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
export function Frame({ realm }: { realm: DataReader<Realm> }) {
    const location = useLocation();
    return (
        <div className='flex flex-col w-screen h-screen'>
            <Menu />
            <div className='flex flex-grow p-3 bg-yellow-light'>
                <Viewport realm={realm.read()} />
            </div>
            <div className='flex bg-pink-light'>
                <span className='inline-flex py-0.5 px-2 bg-red text-white'>
                    {location.pathname}
                </span>
            </div>
        </div>
    );
}
export default function Window() {
    const realm = useRealm();
    return (
        <Boundary fallback={<Loading />}>
            <Frame realm={realm.reader}></Frame>
        </Boundary>
    );
}
