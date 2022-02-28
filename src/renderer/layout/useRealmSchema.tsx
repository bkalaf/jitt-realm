import { useCallback, useMemo } from 'react';
import { toTitleCase } from '../../common/text/toTitleCase';
import { $$Schema } from '../db';

export type ColumnInfoMap<T extends DataEntryElement> = Map<string, PropertyProps<T>>;

export function useRealmSchema(realm: Realm) {
    const typeMap = useMemo(
        () =>
            new Map(
                realm.schema.map((x): [string, RealmSchemaKind] => [
                    x.name,
                    x.embedded ? 'embedded' : x.primaryKey === '_id' ? 'lookup' : 'neither'
                ])
            ),
        []
    );
    const isPrimitive = useCallback((type: string) => {
        return ['bool', 'string', 'int', 'double', 'float', 'decimal128', 'data', 'date', 'objectId', 'uuid'].includes(type);
    }, []);
    const isEmbedded = useCallback((type: string) => {
        return typeMap.get(type) === 'embedded';
    }, []);
    const isLookup = useCallback((type: string) => {
        return typeMap.get(type) === 'lookup';
    }, []);
    const propertiesMap: Record<string, Record<string, IPropertyInfo>> = useMemo(
        () =>
            realm.schema
                .map((x) => [x.name, Object.entries(x.properties)] as [string, [string, Realm.ObjectSchemaProperty][]])
                .map(([typeName, propertyNameSchemaProperty]) => ({
                    [typeName]: propertyNameSchemaProperty
                        .map(([propertyName, schemaProperty]) => ({
                            [propertyName]: {
                                propertyName,
                                datatype: (schemaProperty.objectType != null ? schemaProperty.objectType : schemaProperty.type) as
                                    | Primitive
                                    | Objects,
                                optional: schemaProperty.optional ?? false,
                                kind:
                                    schemaProperty.type === 'linkingObjects'
                                        ? 'linkingObjects'
                                        : ['list', 'dictionary', 'set'].includes(schemaProperty.type)
                                        ? (schemaProperty.type as Collection)
                                        : schemaProperty.type === 'object'
                                        ? isLookup(schemaProperty.objectType ?? '')
                                            ? 'lookup'
                                            : isEmbedded(schemaProperty.objectType ?? '')
                                            ? 'embedded'
                                            : 'primitive'
                                        : ('primitive' as DataKinds),
                                displayName: $$Schema[typeName].columnMap[propertyName]
                                    ? $$Schema[typeName].columnMap[propertyName][0]
                                    : toTitleCase(propertyName),
                                attributes: $$Schema[typeName].columnMap[propertyName]
                                    ? ($$Schema[typeName].columnMap[propertyName][1] as Attributes)
                                    : {}
                            }
                        }))
                        .reduce((pv, cv) => ({ ...pv, ...cv }), {})
                }))
                .reduce((pv, cv) => ({ ...pv, ...cv }), {}),
        [$$Schema, realm.schema]
    );
    const getPropertyInfo = useCallback(
        <T extends DataEntryElement>(typeName: string, propertyName: string): IPropertyInfo<T> => {
            const [head, ...tail] = propertyName.split('.');
            if (tail.length === 0) {
                const info: IPropertyInfo<T> = propertiesMap[typeName][head];
                return {
                    ...info
                };
            }
            const next = propertiesMap[typeName][head].datatype;
            return getPropertyInfo(next, tail.join('.'));
        },
        [propertiesMap]
    );
    const columnsList: Record<string, string[]> = useMemo(() => {
        return realm.schema.map((type) => ({ [type.name]: $$Schema[type.name].columns })).reduce((pv, cv) => ({ ...pv, ...cv }), {});
    }, []);
    const flattenedColumnList: Record<string, IColumnPosition[]> = useMemo(() => {
        return realm.schema
            .map((x) => ({
                [x.name]: columnsList[x.name]
                    .map((col) => {
                        const info = getPropertyInfo(x.name, col);
                        if (info.kind === 'embedded') {
                            return columnsList[info.datatype].map((x) => {
                                const info2 = getPropertyInfo(info.datatype, x);
                                return {
                                    columnName: `${col}.${x}`,
                                    displayName: info2.displayName
                                };
                            });
                        }
                        return [{ columnName: col, displayName: info.displayName ?? toTitleCase(col) }];
                    })
                    .reduce((pv, cv) => [...pv, ...cv], [])
                    .map((x, ix) => ({ ...x, ordinal: ix }))
            }))
            .reduce((pv, cv) => ({ ...pv, ...cv }), {});
    }, []);
    const getColumnsList = useCallback((name: string) => {
        return flattenedColumnList[name].sort((x) => x.ordinal);
    }, []);
    const getTypeInfo = useCallback(
        (name: string) => {
            const result = typeMap.get(name);
            if (result == null) {
                // throw new Error(`TypeInfo for ${name} does not exist.`);
                return 'neither';
            }
            return result;
        },
        [typeMap]
    );
    const getColumnsInfo = useCallback(<T extends DataEntryElement>(name: string): ColumnInfoMap<T> => {
        const list = getColumnsList(name);
        return new Map(list.map(({ columnName, ordinal }) => [columnName, { ...getPropertyInfo(name, columnName), ordinal, columnName }]));
    }, []);
    const getFields = useCallback((type: string): string[] => {
        function inner(pi: IPropertyInfo, ti: string, cn: string) {
            switch (ti) {
                case 'lookup':
                case 'neither':
                    return [cn];
                case 'embedded':
                    return [cn, ...getFields(pi.datatype).map((x) => `${cn}.${x}`)];
                default:
                    throw new Error();
            }
        }
        const cols = columnsList[type];
        const result = cols
            .map((columnName) => {
                const propertyInfo = getPropertyInfo(type, columnName);
                const typeInfo = getTypeInfo(propertyInfo.datatype);
                return inner(propertyInfo, typeInfo, columnName);
            })
            .reduce((pv, cv) => [...pv, ...cv], []);
        return result;
    }, []);
    return {
        getPropertyInfo,
        getTypeInfo,
        getColumnsList,
        getColumnsInfo,
        getFields
    };
}
