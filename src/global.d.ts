import { ObjectId } from 'bson';
import * as React from 'react';
import { SortDescriptor } from 'realm';

declare global {
    export let JITTRegistrar: { 
        getInitial(name: string): () => any;
        getConvert(name: string): (x: any) => any;
        getChildren(name: string): JSX.Element[];
        addInsert(name: string, initial: () => any, convert: (x: any) => any, children: JSX.Element[], GridHeaders: () => JSX.Element, TableRow: () => JSX.Element, sort: SortDescriptor[]): void;
        getInsertProps(name: string): any;
        getGridProps(name: string): any;
    };
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
        columnMap: Record<string, [string, React.InputHTMLAttributes<HTMLInputElement> | (React.SelectHTMLAttributes<HTMLSelectElement> & { enumMap: Record<string, string> })]>;
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
    export type ClassObject<T extends string> = T extends $SelfStorage ? SelfStorage : T extends $Address ? Address : T extends $Facility ? Facility : never;
    export type GetValue<T> = (name: string, stringify?: IStringifyFunction) => () => T;
    export type SetValue<T, TElement> = (name: string, convert: (s: string) => T) => (ev: React.ChangeEvent<TElement>) => void;
    export type Convert<T> = (x: string) => T;
    export type IUnsubscribeFunction = () => void;
    export type CalculationUpdate<T> = (setter: StateSetter<string>) => (x: T) => string;
    export type Initializer<T> = T | (() => T);
    // eslint-disable-next-line @typescript-eslint/ban-types
    export type ConversionOrCalculation<T, U, V extends Record<string, string> = {}> =
        | [convertFrom: (x: T, realm?: Realm) => U, convertTo: (x: U, realm?: Realm) => T]
        // eslint-disable-next-line @typescript-eslint/ban-types
        | ((x: T, y: V) => U);

    export interface IGetterFunction<T> {
    <K extends keyof T & string>(name: K, stringify: IStringifyFunction, unsaved: string | undefined): () => string;
    }

    export interface IFormSubscribe {
        (propName: string, value: [React.RefObject<DataEntryElement>, () => boolean, Array<Validator<any>>]): void
    }
    // export interface IStringifyFunction {
    //     <K extends keyof T & string>(x: T[K]): string;
    // }
    // export interface IStringifyFunction<T = any> {
    //     <T>(x: T): string;
    // }
    export interface IStringifyFunction {
        (x: any): string;
    }
    export interface IParseFunction {
        (x: string): any;
    }
    export interface ISavedValueSetterFunction<T> {
        <K extends keyof T & string>(name: K, parse: IParseFunction, setSaved: StateSetter<string>, addError: (name: string, messages: string[]) => void): (value: string) => void;
    }
    export interface ISavedValueGetterFunction<T> {
        <K extends keyof T & string>(name: K, stringify: IStringifyFunction, unsavedData: string | undefined): () => string; 
    }
    export interface ISetterFunction<T> {
        <K extends keyof T & string>(name: K, parse: IParseFunction): (value: string) => void;
    }
    export interface IAction {
        (): void;
    }
    export interface IActionFunction<T> {
        (x: T): void;
    }
    export type IPredicate<T> = (...x: T) => boolean;
    export type IQuery<TArgs extends any[], T> = (...x: TArgs) => T;
    export type IBinaryPredicate = IQuery<never[], boolean>

    // export interface Validator2<V> {
    //     (x: V): Result<V>;
    // }
    export interface Validator2<T> {
        <K extends keyof T>(x: T[K]): Result<T[K]>;
    }

    export interface IValidatorResult<V> {
        <T>(x: V): Result<T>;
    }
    export type Validator<T> = Validator2<T>;
    export type Subscriber<T> = <K extends keyof T & string>(name: K, item: [ref: RefObject<DataEntryElement>, hasUnsavedData: IBinaryPredicate, validators: Validator<T>[]]) => void;

    export interface IRealmDTO {
        _id: ObjectId;
    }
}
export const i = 1;