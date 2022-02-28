import Realm from 'realm';
import { ObjectId } from 'bson';
import { Facility } from "./Facility";
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { ifEmpty } from '.';

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
    name: string = '';
    website: string | undefined;
    facilities: Facility[] = [];
    static sort: [string, boolean][] = [['name', false]];
    static toDisplayName(obj: SelfStorage): string {
        return obj.name;
    }
    static columns: string[] = ['_id', 'name', 'website', 'facilities'];
    static columnMap: Record<string, [string, React.InputHTMLAttributes<HTMLInputElement> & any]> = {
        _id: ['ID', { icon: faKey, required: true, readOnly: true, dataTitleFunc: "data => data._id.toHexString()" }],
        name: ['Name', { required: true, type: 'text' }],
        website: ['Website', { type: 'url' }],
        facilities: ['Facility Count', { type: 'number', func: 'x => x.facilities.length'}]
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
        }
    };
    static init = () => ({
        _id: new ObjectId(),
        name: '',
        website: '',
        facilities: [] as Facility[]
    });
}
