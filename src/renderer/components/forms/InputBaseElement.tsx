// import React, { HTMLInputTypeAttribute } from 'react';
// import { ControlBase } from '.';
// import { toTitleCase } from '../../../common/text/toTitleCase';

// export function InputBaseElement<T>({
//     name,
//     toBacking,
//     toOutput,
//     displayName,
//     type,
//     required,
//     readOnly
// }: {
//     name: string;
//     toOutput: (x: T) => string;
//     toBacking: (x: string) => T;
//     type: HTMLInputTypeAttribute;
//     displayName: string;
//     readOnly?: boolean;
//     required?: boolean;
// }) {
//     const result = React.createElement(ControlBase, {
//         name,
//         displayName: displayName ?? toTitleCase(name),
//         controlTag: 'input',
//         labelTag: 'label',
//         containerTag: 'div',
//         feedbackTag: 'div',
//         toBacking: toBacking as any,
//         toOutput: toOutput as any,
//         required: required ?? false,
//         readOnly: readOnly ?? false,
//         initial: () => '',
//         validators: ['x => x.length > 5'],
//         type: type
//     });
//     return result;
// }
