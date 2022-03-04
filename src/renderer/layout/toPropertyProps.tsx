export function toPropertyProps<T extends DataEntryElement>({
    ordinal,
    columnName,
    displayName,
    kind,
    datatype,
    propertyName,
    optional,
    name,
    attributes
}: PropertyProps<T> & { name?: string }): IPropertyProps<T> {
    console.log('attributes', attributes);
    const { enumMap, func, ...attr } = (attributes as any) ?? { enumMap: {}, func: undefined as string | undefined };
    console.log()
    return {
        ordinal,
        name: columnName ?? name,
        displayName,
        calculated: func != null,
        func,
        kind,
        datatype,
        propertyName,
        required: attributes.required ?? !optional,
        enumMap,
        ...attributes
    } as IPropertyProps<T>;
}
