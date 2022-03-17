// import { useTheme } from "../../providers/useTheme";
// import * as React from 'react';
// import { ObjectId } from 'bson';
// import { Stringify } from '../../db/Facility';
// import { useControl2 } from './useControl2';

// export function LookupSelectControl<T extends { _id: ObjectId; }>({
//     name, convert, labelID, getValue, readOnly, disabled, setValue, children, ...props
// }: React.SelectHTMLAttributes<HTMLSelectElement> & {
//     getValue: GetValue<T>;
//     setValue: SetValue<T, HTMLSelectElement>;
//     labelID: string;
//     convert: (x: string) => ObjectId;
//     readOnly?: boolean;
//     children?: Children;
// }) {
//     const { onBlur, onChange, output } = useControl2(
//         new ObjectId().toHexString(),
//         name ?? '',
//         convert,
//         (x: string) => new ObjectId(x).toHexString(),
//     );
//     const className = useTheme(
//         {
//             'select-none': readOnly ?? false,
//             'select-all': disabled ?? false,
//             'cursor-not-allowed': disabled ?? false
//         },
//         '',
//         'form',
//         'insert',
//         'field',
//         'select'
//     );
//     return (
//         <select
//             {...props}
//             className={className}
//             onBlur={onBlur}
//             onChange={onChange}
//             value={output}
//             disabled={disabled}
//             aria-labelledby={labelID}>
//             {children}
//         </select>
//     );
// }
