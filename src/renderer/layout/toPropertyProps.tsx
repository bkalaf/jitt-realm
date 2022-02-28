export function toPropertyProps<T extends DataEntryElement>({
    ordinal,
    columnName,
    displayName,
    kind,
    datatype,
    propertyName,
    optional,
    attributes
}: PropertyProps<T>): IPropertyProps<T> {
    const { enumMap, func,...attr } = (attributes as any) ?? {};
    return {
        ordinal,
        name: columnName,
        displayName,
        calculated: func != null,
        func,
        kind,
        datatype,
        propertyName,
        required: !optional,
        enumMap,
        ...(attr as Attributes<T>)
    };
}
