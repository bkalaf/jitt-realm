/* eslint-disable react/boolean-prop-naming */
import Realm from 'realm';
import { ObjectId } from 'bson';
import { $Facility, Facility } from './Facility';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { useTheme } from '../hooks/useTheme';
import { HTMLInputTypeAttribute, useDebugValue } from 'react';
import { ObjectIdField } from './ObjectIdField';
import { TextField } from './TextField';
import { ifEmpty } from '../../common/src/ifEmpty';
/**
 * @deprecated
 */
export const $SelfStorage: $SelfStorage = 'SelfStorage';
/**
 * @deprecated
 */
export class SelfStorage {
    constructor() {
        this._id = new ObjectId();
    }
    static schema: Realm.ObjectSchema = {
        name: 'SelfStorage',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            website: 'string?',
            facilities: {
                type: 'linkingObjects',
                objectType: 'Facility',
                property: 'selfStorage'
            }
        }
    };
    _id: ObjectId = new ObjectId();
    name = '';
    website: string | undefined;
    facilities: Facility[] = [];
    static sort: [string, boolean][] = [['name', false]];
    static toDisplayName(obj: SelfStorage): string {
        return obj.name;
    }
    static columns: string[] = ['_id', 'name', 'website', 'facilities'];
    static columnMap: Record<string, [string, React.InputHTMLAttributes<HTMLInputElement> & any]> = {
        _id: ['ID', { icon: faKey, required: true, readOnly: true, dataTitleFunc: 'data => data._id.toHexString()' }],
        name: ['Name', { required: true, type: 'text' }],
        website: ['Website', { type: 'url' }],
        facilities: ['Facility Count', { type: 'number', func: 'x => (x.facilities ?? [])?.length ?? 0' }]
    };
    static convertFrom = (obj: SelfStorage): Record<string, any> => ({
        _id: obj._id.toHexString(),
        name: obj.name,
        website: obj.website ?? '',
        facilities: obj.facilities.map((x) => x._id)
    });
    static convertTo = (obj: Record<string, any>, realm?: Realm) => {
        return {
            _id: new ObjectId(obj._id),
            name: obj.name,
            website: ifEmpty(obj.website),
            facilities: obj.facilities.map((x: ObjectId) => realm?.objectForPrimaryKey($Facility, x))
        };
    };
    static init = () => ({
        _id: new ObjectId(),
        name: '',
        website: '',
        facilities: [] as ObjectId[]
    });
    static TabularForm: React.FunctionComponent<{ realm: Realm }> = function <T>({ realm }: { realm: Realm }) {
        return <></>;
    };
    static Insert: React.FunctionComponent<{
        realm: Realm;
        saveOnBlur?: boolean;
        prefix: string;
    }> = function <T, TElement extends DataEntryElement>({ realm, prefix }: { realm: Realm; prefix?: string }) {
        return (
            <>
                <ID />
                <TextField name='name' type='text' required />
                <TextField name='website' type='url' />
            </>
        );
    };
}
/**
 * @deprecated
 */
export function ID() {
    useDebugValue('ID');
    return <ObjectIdField name='_id' display='ID' type='text' required readOnly />;
}
/**
 * @deprecated
 */
export function $useThemeClassNames(...remain: string[]) {
    return useTheme({}, '', 'form', 'insert', 'field', ...remain);
}
/**
 * @deprecated
 */
export type TextFieldProps<T> = {
    name: string;
    display?: string;
    validators?: string[];
    children?: Children;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    converts?: ConversionOrCalculation<T, T>;
};
