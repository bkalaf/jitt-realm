import { ObjectSchemaProperty } from 'realm';
import { FieldSetElementAttr, InputElementAttr, ListElementAttr, SelectElementAttr, TextareaElementAttr } from './LinkedObject';

export type Primitive = [optional: boolean, type: string];
export type CompoundType = [optional: boolean, type: 'objects', objectType: string];
export type ListType = [optional: boolean, type: 'list', objectType: string];
export type DictionaryType = [optional: boolean, type: 'dictionary', objectType: string];
export type SetType = [optional: boolean, type: 'set', objectType: string];
export type LinkingObjectsType = [optional: boolean, type: 'linkingObjects', objectType: string, property: string];
export interface IFieldInfo<TKind extends string> {
    name: string;
    type: Primitive | CompoundType | ListType | DictionaryType | SetType | LinkingObjectsType;
    elementType: TKind;
    default?: string;
    displayName?: string;
    index: number;
    parse?: string; // (s: string | readonly string[] | number | boolean) => any;
    stringify?: string; // (s: any) => string | readonly string[] | number | boolean;
    props: Partial<TKind extends 'fieldset' ? FieldSetElementAttr : TKind extends 'input' ? InputElementAttr : TKind extends 'select' ? SelectElementAttr : TKind extends 'ul' ? ListElementAttr : TKind extends 'ol' ? ListElementAttr : TKind extends 'textarea' ? TextareaElementAttr : never>;
    mappedTo?: string;
}

export type ObjectKind = [isEmbedded: boolean, pk: undefined | string];
export interface IRealmObjectInfo {
    name: string;
    objectKind: [true] | [false, 'id'],
    fields: Map<string, IFieldInfo<any>>
}