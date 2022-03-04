import Realm, { BSON } from 'realm';
import { ObjectId } from 'bson';
import { Facility } from './Facility';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { ifEmpty } from '.';
import { identity } from '../../common/identity';
import { InputBaseElement } from '../components/forms/InputBaseElement';
import { useTheme } from '../providers/useTheme';
import { toTitleCase } from '../../common/text/toTitleCase';
import { useRef, useState } from 'react';

export const $SelfStorage: $SelfStorage = 'Self-Storage';

export class SelfStorage {
    constructor() {
        this._id = new ObjectId();
    }
    static schema: Realm.ObjectSchema = {
        name: $SelfStorage,
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
        website: obj.website ?? ''
    });
    static convertTo = (obj: Record<string, any>, realm?: Realm) => {
        return {
            _id: new ObjectId(obj._id),
            name: obj.name,
            website: ifEmpty(obj.website)
        };
    };
    static init = () => ({
        _id: new ObjectId(),
        name: '',
        website: '',
        facilities: [] as Facility[]
    });
    static TabularForm: React.FunctionComponent<{ realm: Realm }> = function<T>({ realm, init, outFunc, inFunc, name, displayName }: { name: string; displayName?: string; realm: Realm, init: Initializer<T>, outFunc: (x: T) => string, inFunc: (x: string) => T }) {
        const title = displayName ?? toTitleCase(name);
        const [formData, setFormData] = useState(init);
        const memoized = useRef(value);
    }
    static Insert: React.FunctionComponent<{
        realm: Realm
    }> = function <T, TElement extends DataEntryElement>({ realm }: { realm: Realm }) {
        return (
            <>
                <InputBaseElement
                    type='text'
                    name='_id'
                    displayName='ID'
                    readOnly
                    required
                    toBacking={identity}
                    toOutput={(x: BSON.ObjectId) => x.toHexString()}></InputBaseElement>
                <InputBaseElement
                    type='text'
                    name='name'
                    displayName='Name'
                    toBacking={identity}
                    toOutput={(x: string) => identity(x)}
                    readOnly={false}
                    required
                />
                <InputBaseElement
                    type='url'
                    name='website'
                    displayName='Website'
                    toBacking={identity}
                    toOutput={(x: string) => x.trim()}
                    readOnly={false}
                    required={false}></InputBaseElement>
            </>
        );
    };
}

export function ObjectIdControl() {
    const className = useTheme({}, '', 'form', 'insert', 'control');
    return React.createElement('input', {
        className,
        type: 'text',
        readOnly: true,
        required: true,
        init: () => new ObjectId(),
        toOutput: (x: BSON.ObjectId) => x.toHexString(),
        toBacking: (x: BSON.ObjectId) => x,
        displayName: 'Name'
    })
}