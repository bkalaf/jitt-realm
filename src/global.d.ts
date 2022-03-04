import * as React from 'react';

declare global {
    export type IEventer<T extends Event> = {
        addEventListener(event: string, listener: (x: T) => void): void;
        removeEventListener(event: string, listener: (x: T) => void): void;
    };
    export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
    export type ClassNameFlags = Record<string, boolean>;

    export type Children = React.ReactNode | React.ReactNode[];
    export type JittObjectClass<T> = {
        toDisplayName(obj: any): string;
        columns: string[];
        columnMap: Record<
            string,
            [
                string,
                (
                    | React.InputHTMLAttributes<HTMLInputElement>
                    | (React.SelectHTMLAttributes<HTMLSelectElement> & { enumMap: Record<string, string> })
                )
            ]
        >;
        sort: Realm.SortDescriptor[];
        convertFrom: (obj: T) => Record<string, any>;
        convertTo: (obj: Record<string, any>, realm?: Realm) => Record<string, any>;
        init: () => any;
        Insert: React.FunctionComponent<{
            prefix?: string;
            saveOnBlur?: boolean;
            realm?: Realm;
        }>;
    };
    export type JittClass<T> = Realm.ObjectClass & JittObjectClass<T>;
    export type ColumnAttributes =
        | React.InputHTMLAttributes<HTMLInputElement>
        | (React.SelectHTMLAttributes<HTMLSelectElement> & {
              icon?: IconDefinition;
              enumMap?: Record<string, string>;
              dataTitleFunc?: string;
              func?: string;
              readOnly?: boolean;
              toText?: string;
          });
    export type ColumnMap = Record<string, [string, ColumnAttributes]>;
    type SelectChangeEvent = (ev: React.ChangeEvent<HTMLSelectElement>) => void;

    type InputChangeEvent = (ev: React.ChangeEvent<HTMLInputElement>) => void;
    export type RealmSchemaKind = 'lookup' | 'neither' | 'embedded';

    export type Primitive = 'string' | 'bool' | 'int' | 'double' | 'float' | 'decimal128' | 'objectId' | 'uuid' | 'data' | 'date';
    export type Collection = 'list' | 'set' | 'dictionary';
    export type Reference = 'object' | 'linkingObjects';
    export type $SelfStorage = 'SelfStorage';
    export type $Address = 'Address';
    export type $Facility = 'Facility';
    export type Objects = $SelfStorage | $Address | $Facility;
    export type DataTypes = Primitive | Collection | Reference | Objects;
    export type DataKinds = 'primitive' | 'embedded' | 'lookup' | 'linkingObjects' | Collection;
    export type IPropertyInfo<T extends DataEntryElement = DataEntryElement> = {
        kind: DataKinds | 'fieldset';
        datatype: Exclude<DataTypes, Collection | Reference> | 'fieldset';
        attributes: Attributes<T>;
        propertyName: string;
        displayName: string;
        optional: boolean;
        readOnly?: boolean;
        func?: string;
    };
    export type IColumnPosition = {
        ordinal: number;
        columnName: string;
        displayName: string;
    };
    export type DataEntryElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    export type Attributes<T extends DataEntryElement = DataEntryElement> = T extends HTMLInputElement
        ? React.InputHTMLAttributes<T>
        : T extends HTMLSelectElement
        ? React.SelectHTMLAttributes<T> & { enumMap?: Record<string, string> }
        : React.TextareaHTMLAttributes<T>;

    export type IPropertyProps<T extends DataEntryElement = DataEntryElement> = {
        ordinal: number;
        name: string;
        displayName: string;
        kind: DataKinds | 'fieldset';
        datatype: DataTypes;
        propertyName: string;
        required: boolean;
        enumMap?: Record<string, string>;
        icon?: IconDefinition;
        dataTitleFunc?: string;
        func?: string;
        calculated?: boolean;
        readOnly?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        toText?: string;
    } & Attributes<T>;

    export type PropertyProps<T extends DataEntryElement> = IColumnPosition & IPropertyInfo<T>;
    export type ClassObject<T extends string> = T extends $SelfStorage
        ? SelfStorage
        : T extends $Address
        ? Address
        : T extends $Facility
        ? Facility
        : never;
    export type GetValue<T> = (name: string, stringify?: Stringify<T>) => () => T;
    export type SetValue<T, TElement> = (name: string, convert: (s: string) => T) => (ev: React.ChangeEvent<TElement>) => void;
    export type Convert<T> = (x: string) => T;
    export type Stringify<T> = (x: T) => string;
    export type IUnsubscribe = () => void;
    export type CalculationUpdate<T> = (setter: StateSetter<string>) => (x: T) => string;
    export type Initializer<T> = T | (() => T);
    export type ConversionOrCalculation<T, U> =
    | [convertFrom: ((x: T, realm?: Realm) => U), convertTo: (x: U, realm?: Realm) => T]
    | string;
}
export const i = 1;
