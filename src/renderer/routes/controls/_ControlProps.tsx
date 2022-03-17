// import { HTMLInputTypeAttribute, RefObject } from 'react';
// import { SelfStorage } from '../data/auctions/selfStorage/index';
// import { Result } from '../../hooks/$useControl';
// import React from 'react';
// import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
// import { Unsubscribe } from '../../types/Unsubscribe';
// import { AutoComplete } from '../enums/AutoComplete';



// /**
//  * @deprecated
//  */
// export type ControlProps<T> = {
//     name: string;
//     display?: string;
//     feedbacking?: boolean;
//     getter?: (x: string) => T;
//     setter?: (x: keyof SelfStorage, conversion?: (x: string) => any, valueAs?: 'date' | 'number') => (ev: React.ChangeEvent<DataEntryElement>) => void;
//     subscribe?: Subscriber<T>;
//     unsubscribe?: Unsubscribe;
//     getErrors?: (item: string) => [RefObject<DataEntryElement>, string[]];
//     children?: Children;
//     autoComplete?: AutoComplete;
//     required?: boolean;
//     readOnly?: boolean;
//     placeholder?: string;
//     icon?: IconDefinition;
//     disabled?: boolean;
//     calculated?: boolean;
//     realm?: Realm;
//     toOutput?: (x: T) => string;
//     toDatabase?: (s: string) => T;
//     validators?: Array<(x: T) => Result<T>>;
//     inputType?: HTMLInputTypeAttribute;
// };
