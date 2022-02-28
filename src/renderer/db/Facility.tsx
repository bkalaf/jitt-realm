import Realm from 'realm';
import { ObjectId } from 'bson';
import { $SelfStorage, SelfStorage } from './SelfStorage';
import { $Address, Address } from './Address';
import { ifEmpty } from './index';
import { objectMap } from '../../common/object/objectMap';
import { faKey } from '@fortawesome/pro-regular-svg-icons';

export const $Facility: $Facility = 'Facility';

export class Facility {
    static schema: Realm.ObjectSchema = {
        name: $Facility,
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            selfStorage: $SelfStorage,
            facilityNumber: 'string?',
            address: $Address,
            email: 'string?',
            phoneNumber: 'string?'
        }
    };
    _id: ObjectId = new ObjectId();
    selfStorage: SelfStorage | undefined;
    facilityNumber: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    address: Address = new Address();
    get name(): string {
        return [this.selfStorage?.name, this.address.cityState, this.address.streetOnly].join(' - ');
    }
    static sort: [string, boolean | undefined][] = [
        ['address.state', false],
        ['address.city', false],
        ['address.street', false]
    ];
    static columns: string[] = ['_id', 'name', 'selfStorage', 'facilityNumber', 'address', 'email', 'phoneNumber'];
    static columnMap: ColumnMap = {
        ...{
            _id: ['ID', { icon: faKey, required: true, readOnly: true, dataTitleFunc: 'data => data._id.toHexString()' }],
            selfStorage: ['Company', { type: 'text' }],
            facilityNumber: ['Facility #', { type: 'text' }],
            phoneNumber: ['Phone #', { type: 'tel' }],
            email: ['E-mail', { type: 'email' }],
            address: ['Address', {}],
            name: ['Name', { type: 'text', readOnly: true }]
        },
        ...objectMap(Address.columnMap, (x) => `address.${x}`)
    };
    static toDisplayName(obj: Facility): string {
        return obj.name;
    }
    static convertFrom = (obj: Facility) => ({
        _id: obj._id.toHexString(),
        selfStorage: obj.selfStorage?._id,
        facilityNumber: obj.facilityNumber ?? '',
        phoneNumber: obj.phoneNumber ?? '',
        email: obj.email ?? '',
        address: Address.convertFrom(obj.address)
    });
    static convertTo = (obj: Record<string, any>, realm: Realm) => {
        return {
            _id: new ObjectId(obj._id),
            facilityNumber: ifEmpty(obj.facilityNumber),
            phoneNumber: ifEmpty(obj.phoneNumber),
            email: ifEmpty(obj.email),
            address: Address.convertTo(obj.address, realm),
            selfStorage: realm.objectForPrimaryKey($SelfStorage, obj.selfStorage)
        }
    };
    static init = () => ({
        _id: new ObjectId(),
        facilityNumber: '',
        phoneNumber: '',
        email: '',
        address: Address.init(),
        selfStorage: undefined
    });
}
