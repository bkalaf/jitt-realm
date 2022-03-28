import { ReactText } from 'react';
import { ObjectSchemaProperty } from 'realm';
import orm from './../../orm.json';

export type InputElementAttr = React.InputHTMLAttributes<HTMLInputElement>;
export type SelectElementAttr = React.SelectHTMLAttributes<HTMLSelectElement>;
export type FieldSetElementAttr = React.FieldsetHTMLAttributes<HTMLFieldSetElement>;
export type TextareaElementAttr = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type ListElementAttr = React.OlHTMLAttributes<HTMLOListElement>;
export type LinkedObject<T> = Realm.Object & T;

export type CombinedPropertyInfo = ObjectSchemaProperty
export interface ITypeInfo<Embedded extends boolean, PrimaryKey extends string | undefined> {
    name: string;
    primaryKey?: PrimaryKey | string | undefined;
    embedded?: boolean | undefined;
    properties: Record<string, CombinedPropertyInfo>;
}

export type RealmObjectKinds = ITypeInfo<true, undefined> | ITypeInfo<false, 'id'> & ObjectSchemaProperty;

