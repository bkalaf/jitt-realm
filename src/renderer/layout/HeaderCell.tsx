import { useRecordType } from '../hooks/useRecordType';

export function HeaderCell({ children, ...remain }: { children: Children } & React.ThHTMLAttributes<HTMLTableCellElement>) {
    // console.log(`HeaderCell: `, children, remain);
    const [type, objectClass] = useRecordType();
    // console.log(`type`, type, `objectClass`, objectClass);
    // console.log(`typeof children`, typeof children, children);
    return <th {...remain}>{children}</th>
    // if (((children as React.ReactElement<any, any>)?.type?.name === 'string') || typeof children === 'string') {
    //     const [label, attributes] = objectClass.columnMap[(children as React.ReactElement<any, any>).type?.name ?? ''] ?? ['', {}];
    //     return <th {...remain}>{label}</th>;
    // }
    // return <th {...remain}>{children}</th>;
}
