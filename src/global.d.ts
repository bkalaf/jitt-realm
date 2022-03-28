import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { ObjectId } from 'bson';
import * as React from 'react';
import { ObjectClass, SortDescriptor } from 'realm';
import { AutoComplete } from './renderer/routes/enums/AutoComplete';

declare global {
    export type Predicate<T> = (x: T) => boolean;
    /**
    * @deprecated
    */
    export type ColumnType = [isOptional: boolean, type: string, objectType?: string, property?: string]
    /**
    * @deprecated
    */
    export type ColumnData = {
            default?: string;
            displayName: string;
            elementType: 'input' | 'select' | 'fieldset';
            index: number;
            init?: string;
            props: any;
            type: ColumnType;
            format?: string;
        }
        /**
        * @deprecated
        */
    export type TypeData = {
        typeName: string;
        embedded: boolean;
        primaryKey: string;
        properties: Record<string, ObjectSchemaProperty>;
        fields: Map<string, ColumnData>;
        objectKind: [isEmbedded: boolean, pk: string];
        sort: SortDescriptor[];
    }
    export type IObject = {
        kind: 'object';
        typeName: string;
        optional: true;
    }
    export type ILinkingObject = {
        kind: 'linkingObjects';
        objectType: IObject;
    }
    export type ICollection = {
        kind: 'list' | 'set' | 'dictionary';
        objectType: IPrimitive |  IObject;
    }
    type RealmPrimitive = 'objectId' | 'uuid' | 'int' | 'double' | 'float' | 'decimal128' | 'bool' | 'string' | 'data' | 'date';

    export type IPrimitive = {
        kind: 'primitive';
        typeName: RealmPrimitive;
        optional?: boolean;
    }
    export type IDataType = ICollection | IPrimitive | ILinkingObject | IObject;
    export type IElements = 'textbox' | 'checkbox' | 'radiobox' | 'combobox' | 'listbox' | 'dropdown' | 'datalist' | 'meter' | 'attachment' | 'output' | 'keyedlist' | 'tags' | 'textblock' | 'link' | 'image' | 'list' | 'fieldset' | 'hide';

    export interface IFieldInfo {
        columnName: string;
        fullName: string;
        prefix: string[];
        type: IDataType;
        props: {
            lookup?: string;
            type?: React.HTMLInputTypeAttribute;
            required?: boolean; 
            readOnly?: boolean;
            disabled?: boolean;
            enum?: Record<string, string>;
            autoComplete?: AutoComplete;
            placeholder?: string;
            multiple?: boolean;
            size?: number;
        };
        displayName?: string;
        elementType: IElements;
        index: number;
        format?: string;
        preSave?: string;
        indexed?: boolean;
        init: (() => string | readonly string[] | number | boolean | object) | (string | readonly string[] | number | boolean | object);
    }
   
    export interface ITypeInfo {
        typeName: string;
        fields: Record<string, IFieldInfo>;
        columns: Omit<IFieldInfo, 'index'>[];
        ctor: ObjectClass;
        sort: SortDescriptor[];
        format?: string;
    }
    export interface IEmbeddedTypeInfo extends ITypeInfo {
        isEmbedded: true;
        pk: undefined;
    }
    export interface IClassTypeInfo extends ITypeInfo {
        isEmbedded: false;
        pk: string;
    }
    export type IObjectTypeInfo = IClassTypeInfo | IEmbeddedTypeInfo;
    export type IFieldName = { typeName: string, columnName: string }
    export type $$ = {
        realm: Realm;
        // $$schema: ObjectClass[];
        // objectSchema: Record<string, ObjectSchema>;
        // types: Record<string, Omit<IObjectTypeInfo, 'fields' | 'columns'>>;
        // fields: Record<string, IFieldInfo>;
        // columns: Record<string, IFieldInfo[]>;
        // ctors: Record<string, ObjectClass>;
        getTypeInfo(name: string): IObjectTypeInfo;
        getFieldInfo(name: string, columnName: string): IFieldInfo;
        getObjectSchema(name: string): ObjectSchema;
        getColumns(name: string): IFieldInfo[];
        getCtor(name: string): ObjectClass;
        getCells(name: string): IFieldInfo[];
        getControls(name: string): IFieldInfo[];
        getNextID(name: string): number;
        isNested(name: string): boolean;
    };
    export function Reflection(): $$;
    export let JITT: () => $$;
    export function addToast(title: string, body: string, icon: IconDefinition, iconBg: string, iconText: string): void;
    export function getTypeInfo(name: string): TypeData;
    export function pushContent(item: JSX.Element): void;
    export function popContent(): void;
    export function getFieldInfo(name: string, colName: string): ColumnData;
    export function getObjectClass(name: string): ObjectClass;
    export function autoIncrement(name: string): number;
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