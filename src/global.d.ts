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
    };
    export type JittClass<T> = Realm.ObjectClass & JittObjectClass<T>;
    export type ColumnAttributes =
        | React.InputHTMLAttributes<HTMLInputElement>
        | (React.SelectHTMLAttributes<HTMLSelectElement> & {
              icon?: IconDefinition;
              enumMap: Record<string, string>;
              dataTitleFunc?: string;
          });
    export type ColumnMap = Record<string, [string, ColumnAttributes]>;
    type SelectChangeEvent = (ev: React.ChangeEvent<HTMLSelectElement>) => void;

    type InputChangeEvent = (ev: React.ChangeEvent<HTMLInputElement>) => void;
    export type RealmSchemaKind = 'lookup' | 'neither' | 'embedded';

    export type Primitive = 'string' | 'bool' | 'int' | 'double' | 'float' | 'decimal128' | 'objectId' | 'uuid' | 'data' | 'date';
    export type Collection = 'list' | 'set' | 'dictionary';
    export type Reference = 'object' | 'linkingObjects';
    export type $SelfStorage = 'Self-Storage';
    export type $Address = 'Address';
    export type $Facility = 'Facility';
    export type Objects = $SelfStorage | $Address | $Facility;
    export type DataTypes = Primitive | Collection | Reference | Objects;
    export type DataKinds = 'primitive' | 'embedded' | 'lookup' | 'linkingObjects' | Collection;
    export type IPropertyInfo<T extends DataEntryElement = DataEntryElement> = {
        kind: DataKinds;
        datatype: Exclude<DataTypes, Collection | Reference>;
        attributes: Attributes<T>;
        propertyName: string;
        displayName: string;
        optional: boolean;
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
        kind: DataKinds;
        datatype: DataTypes;
        propertyName: string;
        required: boolean;
        enumMap?: Record<string, string>;
        icon?: IconDefinition;
        dataTitleFunc?: string;
        func?: string;
        calculated: boolean;
    } & Attributes<T>;
    export type PropertyProps<T extends DataEntryElement> = IColumnPosition & IPropertyInfo<T>;
    export type ClassObject<T extends Object> = T extends $SelfStorage
        ? SelfStorage
        : T extends $Address
        ? Address
        : T extends $Facility
        ? Facility
        : never;
}
export const i = 1;
