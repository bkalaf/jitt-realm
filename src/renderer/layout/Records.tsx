import { faG } from '@fortawesome/free-solid-svg-icons';
import { ReducerAction, useEffect, useMemo, useRef } from 'react';
import { SortDescriptor } from 'realm';
import { $$Schema } from '../db';
import { RecordSet } from './RecordSet';
import { Toolbar } from './Toolbar';
import { Selectable, useGetPropertyType } from './Window';
import { RecordsHeader } from './RecordsHeader';
import { UUID } from 'bson';
import '../db';
import { identity } from '../../common/identity';
import { objectMap } from '../../common/object/objectMap';
import { $SelfStorage, SelfStorage } from '../db/SelfStorage';
import { $Facility } from '../db/Facility';
import { $Address } from '../db/Address';
import { intersection } from '../../common/array/intersection';
import { unzip } from './unzip';
import { ignore } from '../../common/ignore';
import { InsertForm } from "./InsertForm";
import { useRecordType } from '../hooks/useRecordType';
import { FormContextProvider } from '../components/forms/FormContext';

export function toMap<T, U>(obj: T[], keyFunc: (x: T) => string, valueFunc: (x: T) => U): Record<string, U> {
    return obj.map((v) => ({ [keyFunc(v)]: valueFunc(v) })).reduce((pv, cv) => ({ ...pv, ...cv }), {});
}

export type RealmPrimitive = 'string' | 'bool' | 'int' | 'float' | 'decimal128' | 'double' | 'data' | 'date' | 'objectId' | 'uuid';
export type PropertyInfo_v2 = {
    datatype: RealmPrimitive | $SelfStorage | $Facility | $Address;
    kind: 'primitive' | 'lookup' | 'embedded' | 'list' | 'dictionary' | 'set' | 'linkingObjects';
    optional: boolean;
    calculated: boolean;
    fieldset: boolean;
    ordinal?: number;
    propertyName: string;
    displayName: string;
};
const isPrimitive = (x: string) =>
    ['string', 'bool', 'int', 'float', 'decimal128', 'double', 'data', 'date', 'objectId', 'uuid'].includes(x);

const getDataType = (type: string, objectType?: string) => {
    const datatype = objectType == null ? type : objectType;
    return {
        datatype: datatype,
        kind: isPrimitive(type)
            ? 'primitive'
            : type === 'list'
            ? 'list'
            : type === 'set'
            ? 'set'
            : type === 'dictionary'
            ? 'dictionary'
            : type === 'linkingObjects'
            ? 'linkingObjects'
            : type === 'object' && ($$Schema[datatype as any].schema.embedded ?? false)
            ? 'lookup'
            : 'embedded'
    };
};
export function handlePropertyTypes(prop: string | Realm.ObjectSchema | Realm.ObjectSchemaProperty): {
    datatype: string;
    kind: string;
    optional: boolean;
    calculated: boolean;
} {
    if (typeof prop === 'string') {
        return {
            ...getDataType(prop),
            optional: false,
            calculated: false
        };
    }
    if ('type' in prop) {
        const { type, objectType, optional, property } = prop;
        return {
            ...getDataType(type, objectType),
            optional: optional ?? false,
            calculated: false
        };
    }
    const { name } = prop;
    return {
        ...getDataType(name),
        optional: true,
        calculated: false
    };
}
export type FieldInfo = {
    type: string;
    optional: boolean;
    isList: boolean;
    isDictionary: boolean;
    isSet: boolean;
    isLinkingObjects: boolean;
    isEmbedded: boolean;
    isLookup: boolean;
};

export function Records({
    realm,
    isInsert,
    isGrid,
    ...selectable
}: {
    isInsert: boolean;
    isGrid: boolean;
    realm: Realm;
} & Selectable) {
    const [type, Ctor] = useRecordType();

    const body = isGrid ? (
        <RecordSet realm={realm} {...selectable} />
    ) : isInsert ? (
        <FormContextProvider realm={realm}>
            <InsertForm realm={realm}>
                {<Ctor.Insert realm={realm} />}
            </InsertForm>
        </FormContextProvider>
    ) : (
        <>Single</>
    );
    return (
        <div className='relative flex flex-col w-full h-full'>
            <RecordsHeader realm={realm} isInsert={isInsert} />
            <Toolbar isInsert={isInsert} isGrid={isGrid} isSelectable={selectable.isSelectable} setSelectable={selectable.setSelectable} />
            {body}
        </div>
    );
}
