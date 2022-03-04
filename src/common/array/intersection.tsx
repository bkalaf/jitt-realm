// export function useRealmSchema(realm: Realm) {
//     const schema = useMemo(() => realm.schema, [realm.schema]);
//     const objectSchemaMap = useMemo(() => toMap(schema, (x) => x.name, identity), [schema]);
//     const isEmbedded = useCallback((type: string) => {
//         return objectSchemaMap[type].embedded ?? false;
//     }, [objectSchemaMap]);
//     const isPrimitive = useCallback((type: string) => {
//         return ['string' ,'bool' ,'int' ,'float' ,'decimal128' ,'double' ,'data' ,'date' ,'objectId' ,'uuid'].includes(type);
//     }, []);
//     const typeList = useMemo(() => schema.map(x => x.name), [schema]);
//     const objectColumnMap = useMemo(() => typeList.map(typeName => {
//             const { properties } = objectSchemaMap[typeName];
//             return { [typeName]: Object.entries(properties).map(([propertyName, v]) => {
//                 const { datatype, calculated, kind, optional } = handlePropertyTypes(v);
//                 return { [propertyName]: { datatype, calculated, kind, optional, displayName: $$Schema[typeName].columnMap[propertyName][0], attributes: $$Schema[typeName].columnMap[propertyName][1], propertyName } }
//             })}
//     }), []);
//     const $schemaMap = useMemo(
//         () =>
//             toMap(
//                 schema,
//                 (x) => x.name,
//                 (x) => {
//                     return { ...x, properties: objectMap(x.properties, identity, handlePropertyTypes(objectSchemaMap)) };
//                 }
//             ),
//         [objectSchemaMap, schema]
//     );
//     const getType = useCallback(
//         (type: string) => {
//             return $schemaMap[type];
//         },
//         [$schemaMap]
//     );
//     const getSimpleFieldType = useCallback(
//         (type: string, fieldName: string): FieldInfo => {
//             return getType(type).properties[fieldName];
//         },
//         [getType]
//     );
//     const getFieldType = useCallback(
//         (type: string, fieldName: string): FieldInfo => {
//             if (!fieldName.includes('.')) {
//                 return getSimpleFieldType(type, fieldName);
//             }
//             const [head, ...tail] = fieldName.split('.');
//             return getFieldType(getSimpleFieldType(type, head).type, tail.join('.'));
//         },
//         [getSimpleFieldType]
//     );
//     const getColumnInfos = useCallback(
//         (
//             original: string
//         ): Array<
//             {
//                 displayName: string;
//                 datatype: string;
//                 calculated: boolean;
//                 fieldset: boolean;
//                 collection?: string;
//                 ordinal: number;
//                 required: boolean;
//                 name: string;
//             } & ColumnAttributes
//         > => {
//             return $$Schema[original].columns
//                 .map((columnName) => {
//                     const fieldType: FieldInfo & { calculated?: boolean } =
//                         getFieldType(original, columnName) ??
//                         ({
//                             type: 'string',
//                             calculated: true,
//                             isList: false,
//                             isDictionary: false,
//                             isSet: false,
//                             isLinkingObjects: false,
//                             optional: false,
//                             isEmbedded: false,
//                             isLookup: false
//                         } as FieldInfo & { calculated?: boolean });
//                     const { columns, ...spread } = {
//                         datatype: fieldType.type,
//                         required: !fieldType.optional,
//                         calculated: fieldType.calculated ?? false,
//                         collection: fieldType.isDictionary
//                             ? 'dictionary'
//                             : fieldType.isSet
//                             ? 'set'
//                             : fieldType.isList
//                             ? 'list'
//                             : fieldType.isLinkingObjects
//                             ? 'linkingObjects'
//                             : undefined,
//                         fieldset: fieldType.isEmbedded,
//                         lookup: fieldType.type === 'object' && !fieldType.isEmbedded,
//                         columns: fieldType.isEmbedded
//                             ? getColumnInfos(fieldType.type).map((x) => ({ ...x, name: `${columnName}.${x.name}` }))
//                             : []
//                     };
//                     const [displayName, attributes] = $$Schema[original].columnMap[columnName];
//                     return [
//                         {
//                             displayName,
//                             name: columnName,
//                             ...attributes,
//                             ...spread
//                         },
//                         ...columns
//                     ];
//                 })
//                 .reduce((pv, cv) => [...pv, ...cv], [])
//                 .map((x, ix) => ({ ...x, ordinal: ix }));
//         },
//         []
//     );
//     const info = useRef(new Map<string, TypeDetails>());
//     const getInfo = useCallback((type: string) => {
//         if (info.current.has(type)) {
//             return info.current.get(type)!;
//         }
//         const columnMap = getColumnInfos(type);
//         const columns = columnMap
//             .filter((x) => !x.fieldset)
//             .sort((x) => x.ordinal)
//             .map((x) => x.name);
//         const fields = columnMap
//             .filter((x) => !x.calculated)
//             .sort((x) => x.ordinal)
//             .map((x) => x.name);
//         info.current.set(type, {
//             fields,
//             sort: $$Schema[type].sort as SortDescriptor[],
//             columnMap: columnMap.map((x) => ({ [x.name]: x })).reduce((pv, cv) => ({ ...pv, ...cv }), {}),
//             columns
//         });
//         return info.current.get(type)!;
//     }, []);
//     const result = useMemo(
//         () => ({
//             getType,
//             getFieldType,
//             getColumnInfos,
//             getInfo
//         }),
//         [getType, getFieldType, getColumnInfos]
//     );
//     return result;
// }

export function intersection<T>(arr1: T[], arr2: T[]) {
    return arr1.filter((x) => arr2.includes(x));
}
