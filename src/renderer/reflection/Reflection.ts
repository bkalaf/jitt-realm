import { ObjectClass, ObjectSchema, ObjectSchemaProperty, SortDescriptor } from 'realm';
import { $$schemaOC } from '../models';
import * as fs from 'graceful-fs';
import { MAPPER } from './mapper';
import { $delete, $insert, $update, DBAudit } from '../models/embedded/Audit/DBAudit';
import { ObjectId } from 'bson';
import { JTT } from '../models/junkyard-classes';
export const Type = {
    is: {
        aPrimitive: (x: IDataType): x is IPrimitive => x.kind === 'primitive',
        aDictionary: (x: IDataType): x is ICollection => x.kind === 'dictionary',
        aBacklink: (x: IDataType): x is ILinkingObject => x.kind === 'linkingObjects',
        aList: (x: IDataType): x is ICollection => x.kind === 'list',
        aSet: (x: IDataType): x is ICollection => x.kind === 'set',
        anObject: (x: IDataType): x is IObject => {
            if (x.kind !== 'object') return false;
            const oc = $$schemaOC.filter((a) => x.kind === 'object' && a.schema.name === x.typeName)[0];
            if (oc == null) {
                console.error('MISSED TYPE OC MATCH: ', (x as any).typeName, x.kind);
                return false;
            }
            return !(oc.schema.embedded ?? false);
        },
        anEmbeddedObject: (x: IDataType, name?: string): x is IObject => {
            console.log('testing', name, x);
            if (x == null) return false;
            if (x.kind !== 'object') return false;
            const oc = $$schemaOC.filter((a) => x.kind === 'object' && a.schema.name === x.typeName)[0];
            if (oc == null) {
                console.error('MISSED TYPE OC MATCH: ', (x as any).typeName, x.kind);
                return false;
            }
            return oc.schema.embedded ?? false;
        }
    }
};
export const isCollectionType = (x: string) => ['set', 'dictionary', 'list'].includes(x);
export const isPrimitiveType = (x: string) => ['objectId', 'uuid', 'int', 'double', 'float', 'decimal128', 'bool', 'string', 'data', 'date'].includes(x);
export function ofPrimitive(typeName: RealmPrimitive, optional = false): IDataType {
    return { kind: 'primitive', typeName, optional };
}
export function ofCollection(kind: 'list' | 'set' | 'dictionary', objectType: IPrimitive | IObject): IDataType {
    return { kind, objectType };
}
export function ofBacklink(objectType: IObject): IDataType {
    return { kind: 'linkingObjects', objectType };
}
export function ofObjectType(info: ITypeInfo, isEmbedded: boolean | string): IObjectTypeInfo {
    if (typeof isEmbedded === 'string') {
        return { ...info, typeName: isEmbedded, isEmbedded: false, pk: isEmbedded };
    }
    return { ...info, isEmbedded: isEmbedded as true, pk: undefined };
}

export function ofSchemaProperty(obj: ObjectSchemaProperty): IDataType {
    console.log('ofSchemaProperty', obj);
    const { type, objectType, optional, property } = obj;
    if (property != null) {
        return { kind: 'linkingObjects', objectType: { kind: 'object', typeName: type, optional: (optional as true) ?? true } };
    }
    if (isCollectionType(type)) {
        return {
            kind: type as 'list' | 'set' | 'dictionary',
            objectType: isPrimitiveType(objectType ?? '')
                ? ({ kind: 'primitive', typeName: type ?? '', optional: optional ?? false } as IPrimitive)
                : ({ kind: 'object', typeName: objectType, optional: true as const } as IObject)
        };
    }
    if (isPrimitiveType(type)) {
        return { kind: 'primitive', typeName: type as RealmPrimitive, optional: optional ?? false };
    }
    if (objectType != null) {
        return { kind: 'object', typeName: objectType ?? '', optional: optional as any };
    }
    return { kind: 'object', typeName: objectType ?? '', optional: (optional as true) ?? true };
}

export type ORMType = {
    [key: string]: {
        typeName: string;
        sort: SortDescriptor[];
        format: string;
        fields: Record<
            number,
            {
                columnName: string;
                displayName: string;
                init: string;
                elementType: IElements;
                props: Record<string, any>;
                type: IDataType;
                preSave?: string;
                format?: string;
            }
        >;
    };
};
export function indexSort(a: { index: number }, b: { index: number }) {
    return a.index === b.index ? 0 : a.index < b.index ? -1 : 1;
}
export function addIndexToInfo([index, info]: [string, Omit<IFieldInfo, 'index' | 'prefix'>]) {
    return { prefix: [] as string[], ...info, index: parseInt(index, 10) };
}
export function $eq<T>(a: T) {
    return (b: T) => a === b;
}
export function snd<T, U>(tuple: [T, U]): U {
    return tuple[1];
}
export function fst<T, U>(tuple: [T, U]): T {
    return tuple[0];
}

// const testLinkingObjects = (next: (type: string, objectType: string, property?: string) => IDataType) => (type: string, objectType = 'n/a', property?: string) => property != null ? { kind: 'linkingObjects', objectType: { kind: 'object', typeName: objectType ?? 'n/a' } } as ILinkingObject : next(type, objectType, property);
// const testPrimitiveCollection = (next: (type: string, objectType: string, property?: string) => IDataType) => (type: string, objectType = 'n/a', property?: string) =>
// const testObjectCollection = (next: (type: string, objectType: string, property?: string) => IDataType) => (type: string, objectType = 'n/a', property?: string) =>
// const testPrimitive = (next: (type: string, objectType: string, property?: string) => IDataType) => (type: string, objectType = 'n/a', property?: string) =>
// const
const patternMatch = (type: string, objectType = 'n/a', property?: string, optional = false): IDataType => {
    const { isLinkingObject, isCollection, isPrimitiveCollection, isObjectCollection, isPrimitive } = {
        isCollection: isCollectionType(type),
        isLinkingObject: property != null,
        isPrimitive: isPrimitiveType(type),
        isPrimitiveCollection: objectType !== 'n/a' && isPrimitiveType(objectType) && isCollectionType(type),
        isObjectCollection: objectType !== 'n/a' && !isPrimitiveType(objectType) && isCollectionType(type)
    };
    if (isLinkingObject) {
        return { kind: 'linkingObjects', objectType: { kind: 'object', typeName: objectType, optional: true } } as ILinkingObject;
    } else if (isPrimitive) {
        return { kind: 'primitive', typeName: type, optional } as IPrimitive;
    } else if (isPrimitiveCollection) {
        return { kind: type as any, objectType: { kind: 'primitive', typeName: objectType, optional } } as ICollection;
    } else if (isObjectCollection) {
        return { kind: type as any, objectType: { kind: 'object', typeName: objectType, optional } } as ICollection;
    } else if (type === 'object') {
        return { kind: 'object', typeName: objectType, optional } as IObject;
    }
    throw new Error(`unconverted type: ${type} ${objectType} ${property ?? 'not provided'} ${optional?.toString()}`);
};

/*
objectType !== 'n/a' ? type === 'object' ? { kind: 'object', typeName: objectType ?? 'n/a' } as IObject : isCollection(type) ? { kind: type as ('list' | 'set' | 'dictionary'), objectType: { kind: isPrimitive(objectType ?? 'n/a') ? 'primitive' : next(type, objectType, property) 
*/
// export function convertToFieldInfo(typeName: string, columnName: string, { objectType, type, optional, mapTo, default: defaultValue, property }: ObjectSchemaProperty) {
//     const ORMRecord = ORM as Record<string, { fields: Record<string, any> }>;
//     const ormData = ORMRecord[typeName].fields[columnName];
//     if (ormData == null) {
//         console.error(`did not find ORM data: ${typeName}::${columnName}`);
//         return {} as any as IFieldInfo[];
//     }
//     const { displayName, init, format, indexed, preSave, elementType, props, prefix } = ormData as IFieldInfo;
//     const dataType = patternMatch(type, objectType, property, optional);
//     console.log('DATATYPE', dataType);
//     if (Type.is.anEmbeddedObject(dataType)) {
//         const info = Reflection().getTypeInfo(dataType.objectType.typeName);
//         console.log('TypeInfo:Embedded', info);
//         const result = Object.entries(info.fields)
//             .map(([k, v]) => ({ ...v, prefix: [...v.prefix, columnName] }))
//             .sort(indexSort);
//         return result as IFieldInfo[];
//     }
//     const info = [
//         {
//             columnName,
//             displayName: displayName != null && displayName.length > 0 ? displayName : toTitleCase(mapTo),
//             indexed: indexed ?? false,
//             init: init != null ? init : `() => ${typeof defaultValue === 'string' ? ['"', defaultValue, '"'].join('') : (defaultValue as string).toString()}`,
//             preSave,
//             elementType,
//             prefix,
//             format,
//             props: {
//                 ...props,
//                 required: !optional
//             },
//             type: dataType
//         }
//     ] as IFieldInfo[];
//     return info;
// }
export const createReflection = (realm: Realm, $$schema: ObjectClass[], orm: ORMType): $$ => {
    const objectSchemaLookup = new Map(realm.schema.map((schema) => [schema.name, schema] as [string, Realm.ObjectSchema]));

    const objectClassLookup = new Map($$schema.map((oc) => [oc.schema.name, oc] as [string, Realm.ObjectClass]));

    const typeLookup = new Map(
        Object.entries(
            $$schema
                .map((x) => ({
                    [x.schema.name]: {
                        typeName: x.schema.name,
                        kind: 'object',
                        isEmbedded: x.schema.embedded ?? false,
                        pk: x.schema.primaryKey
                    }
                }))
                .reduce((pv, cv) => ({ ...pv, ...cv }), {})
        )
    );

    // const isNested = (name: string) => (typeLookup.has(name) ? typeLookup.get(name)!.isEmbedded : false);
    const isReference = (name: string) => (typeLookup.has(name) ? !typeLookup.get(name)!.isEmbedded : false);
    console.log(typeLookup);

    const properties = new Map(
        Array.from(objectSchemaLookup.entries()).map(
            ([k, v]: [string, ObjectSchema]) => [k, new Map(Object.entries(v.properties) as [string, ObjectSchemaProperty][])] as [string, Map<string, ObjectSchemaProperty>]
        )
    );
    console.log(properties);

    const ormProperties = new Map(
        Object.entries(orm).map(
            ([typeName, ormProps]) => [typeName, new Map(Object.entries(ormProps.fields).map(([k, v]) => [parseInt(k, 10), v] as [number, IFieldInfo]))] as [string, Map<number, IFieldInfo>]
        )
    );
    console.log(ormProperties);

    const baseAncestor = Object.entries(orm.baseEntity.fields).map(([ix, info]) => [parseInt(ix, 10), { ...info, index: parseInt(ix, 10) }] as [number, IFieldInfo]);
    console.log(baseAncestor);

    // function handleProperty(typeName: string, colName: string, ...prefixes: string[]): [number, IFieldInfo] {
    //     console.log('handling', typeName, colName, prefixes);
    //     if (!ormProperties.has(typeName)) return [0, { columnName: colName, fullName: '', prefix: [], type: {} as any, elementType: 'textbox', props: {}, index: 0, init: '' }];
    //     const [index, { columnName, elementType, init, prefix, props, type: dataType, format, indexed: isIndexed, preSave, displayName }] = find(
    //         (x) => $eq(colName)(x[1].columnName),
    //         Array.from([...ormProperties.get(typeName)!.entries(), ...ormProperties.get('baseEntity')!.entries()])
    //     );
    //     const objSchemaProp = properties.get(typeName)!.get(colName)!;
    //     const { type, default: defaultValue, objectType, optional, indexed, property } = objSchemaProp;
    //     console.log(objSchemaProp);
    //     const result = {
    //         columnName,
    //         elementType,
    //         init: init ? init : `x => ${(defaultValue as string)?.toString() ?? ''}`,
    //         prefix: [...(prefix ?? []), ...prefixes],
    //         props: { ...(props ?? {}), required: props.required ?? !optional },
    //         format,
    //         indexed: isIndexed || indexed,
    //         preSave,
    //         displayName,
    //         index,
    //         type: ofSchemaProperty(objSchemaProp)
    //     };
    //     console.log(result);
    //     return [index, { ...result, fullName: [...result.prefix, result.columnName].join('.') }] as [number, IFieldInfo];
    // }

    // const substituteEmbeds = ([key, node]: [string, [number, IFieldInfo][]]) => {
    //     const result = node.map(([index, info]) => {
    //         if (info.elementType !== 'fieldset') {
    //             return [index, info] as [number, IFieldInfo];
    //         }
    //         const r2 = convertToFieldInfo(typeName, columnName)
    //         const result2 = handleProperty(info.type.kind === 'object' ? info.type.typeName : '', info.columnName, key);
    //         return result2 as [number, IFieldInfo];
    //     });
    //     return [key, result] as [string, [number, IFieldInfo][]];
    //     //     info.elementType !== 'fieldset'
    //     //         ? ([index, [info]] as [number, IFieldInfo[]])
    //     //         : $$schema.filter(x => x.schema.name === info.columnName).map((x: ObjectClass) =>
    //     //               (Object.entries(x.schema.properties) as [string, ObjectSchemaProperty][])
    //     //                   .map(([cn, osp]): [number, IFieldInfo] => handleProperty(x.schema.name, osp.mapTo ?? cn ?? '', info.columnName))
    //     //                   .sort(([ix1, info1], [ix2, info2]) => (ix1 === ix2 ? 0 : ix1 < ix2 ? -1 : 1))
    //     //           )[0]
    //     // );
    // };
    const columns = new Map(
        $$schemaOC.map((x) => {
            const typeName = x.schema.name;
            const isEmbedded = x.schema.embedded ?? false;
            const isReference = x.schema.primaryKey != null;
            const fields = Object.entries(x.schema.properties).map(([k, v]) => [k, typeof v === 'string' ? { kind: isPrimitiveType(v) ? 'primitive' : 'object', objectType: v } : v]) as [
                string,
                ObjectSchemaProperty
            ][];
            const lookup = ormProperties.get(typeName);

            console.log(`lookup`, lookup);
            console.log(`fields`, fields);
            console.log(`typeName`, typeName);
            if (lookup == null) {
                console.error(`lookup failed`, x, typeName);
                return [typeName, []];
            }
            if (isReference) {
                baseAncestor.forEach(([k, v]) => lookup.set(k, v));
            }
            const ormData = Array.from(lookup.entries())
                .map(([index, info]) => {
                    console.log('info', info);
                    return {
                        ...info,
                        ...{ index: index, typeName: typeName, columnName: info.columnName },
                        ...Object.fromEntries(fields)[info.columnName],
                        type: info.type
                    };
                })
                .sort(indexSort);
            return [typeName, ormData as IFieldInfo[]];
        })
    );
    console.log(columns);

    const cells = new Map(
        Array.from(columns.entries())
            .map(([k, v]) => [k, v.filter((a) => a.elementType !== 'hide')] as [string, IFieldInfo[]])
            .map(
                ([typeName, data]) =>
                    [
                        typeName,
                        data
                            .map((x) =>
                                Type.is.anEmbeddedObject(x.type, x.columnName) ? columns.get(x.type.typeName)!.map((y) => ({ ...y, columnName: [x.columnName, y.columnName].join('.') })) : [x]
                            )
                            .reduce((pv, cv) => [...pv, ...cv], [])
                    ] as [string, IFieldInfo[]]
            )
    );
    console.log('cells', cells);

    const controls = new Map(
        Array.from(columns.entries()).map(([typeName, fields]) => {
            return [typeName, fields.map((x) => (x.elementType === 'fieldset' ? { ...x, inner: columns.get((x.type as IObject).typeName) } : { ...x }))] as [string, IFieldInfo[]];
        })
    );
    const types = new Map(
        $$schema
            .map(
                (x): Omit<IObjectTypeInfo, 'fields' | 'columns'> => ({
                    typeName: x.schema.name,
                    isEmbedded: x.schema.embedded as any,
                    pk: x.schema.primaryKey,
                    ctor: $$schemaOC.filter((y) => y.schema.name === x.schema.name)[0],
                    sort: orm[x.schema.name]?.sort,
                    format: orm[x.schema.name]?.format
                })
            )
            .map((x) => [x.typeName, x] as [string, IObjectTypeInfo])
    );
    console.log(types);

    // function createAuditEntry(operation: $insert | $delete | $update, user?: string, table?: string, pk?: ObjectId, field?: string, value?: any): Promise<string> {
    //     return new Promise<string>((resolve, reject) => {
    //         realm.write(() => {
    //             const { _id } = realm.create<{ _id: ObjectId }>(JTT.AUDIT, new DBAudit(operation, new ObjectId(), pk, field, table, value, user));
    //             resolve(_id.toHexString());
    //         });
    //     });
    // }
    // function onCollectionChange<T extends { _id: ObjectId, history: string[] }>(table: string) {
    //     const pks = new Map(realm.objects<{ _id: ObjectId }>(table).snapshot().map((x, ix) => [ix, x._id] as [number, ObjectId]));
    //     return (collection: Realm.Collection<T>, changes: Realm.CollectionChangeSet) => {
    //         changes.deletions.map(ix => {
    //             createAuditEntry($delete, '', table, pks.get(ix), '', undefined);
    //         });
    //         changes.insertions.map(ix => {
    //             createAuditEntry($insert, '', table, collection[ix]._id, '', JSON.stringify(collection[ix])).then(entryID => collection[ix].history.push(entryID));
    //         })
    //         const snapshot = collection.snapshot();
    //         changes.newModifications.map(ix => {
    //             const value = `old: ${JSON.stringify(snapshot[ix])}; new: ${JSON.stringify(collection[ix])}`;

    //             createAuditEntry($update, '', table, collection[ix]._id, '', value).then(entryID => collection[ix].history.push(entryID))
    //         })
    //     };
    // }
    // Realm
    // function onDictionaryChange<T>(table: string) {
    //     return (dict: Realm.Dictionary, changes: Realm.DictionaryChangeSet) => {

    //     }
    // }
    // function onObjectChange<T>(table: string) {
    //     return (obj: Realm.Object, changes: Realm.ObjectChangeSet) => {

    //     }

    return {
        getCells(name: string) {
            return cells.get(name)!;
        },
        getControls(name: string) {
            return controls.get(name)!;
        },
        getTypeInfo(name: string) {
            return types.get(name)!;
        },
        getColumns(name: string) {
            return columns.get(name)!;
        },
        getFieldInfo(typeName: string, columnName: string) {
            const index = columns.get(typeName)!.filter((x) => x.columnName === columnName)[0];
            console.log(`index`, index, index.index);
            return ormProperties.get(typeName)!.get(index.index)!;
        },
        getCtor(name: string) {
            return objectClassLookup.get(name)!;
        },
        getObjectSchema(name: string) {
            return objectSchemaLookup.get(name)!;
        },
        getNextID(name: string) {
            return (realm.objects(name).max('id') as number) + 1;
        },
        isNested(name: string) {
            return getTypeInfo(name).embedded;
        }
    } as $$;
};

fs.writeFileSync(`/home/bobby/jitt/orm-output.json`, JSON.stringify(MAPPER));


console.log(new ObjectId().toHexString())