import Realm from 'realm';
import { ObjectId } from 'bson';
import { $SelfStorage, ID, SelfStorage } from './SelfStorage';
import { $Address, Address } from './Address';
import { ifEmpty } from './index';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { Boundary } from '../components/Boundary';
import { ObjectIdControlElement } from '../components/forms/Controls/ObjectIdControlElement';
import { CalculatedControlElement } from './CalculatedControlElement';
import { LookupControl } from './LookupControl';
import { identity } from '../../common/identity';
import { TextField } from './TextField';
import { LookupField } from './LookupField';

export const $Facility: $Facility = 'Facility';

export const Convert = {
    text: function (x: string) {
        return x.length === 0 ? undefined : x;
    },
    oid: function (x: string): ObjectId | undefined {
        return x.length > 0 ? new ObjectId(x) : undefined;
    },
    lookup: function <T>(realm: Realm, type: string) {
        return function (x: string) {
            return x.length > 0 ? realm.objectForPrimaryKey<T>(type, new ObjectId(x)) : undefined;
        };
    }
};

export const Stringify = {
    text: function (x: string | undefined) {
        return (x ?? '').trim();
    },
    oid: function (x: ObjectId | undefined) {
        return x ? x.toHexString() : '';
    },
    lookup: function <T extends { _id: ObjectId }>(x: T | undefined) {
        return x?._id.toHexString() ?? '';
    }
};
export class Facility {
    static schema: Realm.ObjectSchema = {
        name: 'Facility',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            selfStorage: {
                type: 'SelfStorage',
                optional: true
            },
            facilityNumber: 'string?',
            address: {
                type: 'Address'
            },
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
        return [
            this.selfStorage?.name,
            [this.address.city, this.address.state].join(','),
            this.address.street?.split(' ').slice(1).join(' ')
        ].join(' - ');
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
            selfStorage: ['Company', { toText: 'x => x.name' }],
            facilityNumber: ['Facility #', { type: 'text' }],
            phoneNumber: ['Phone #', { type: 'tel' }],
            email: ['E-mail', { type: 'email' }],
            address: ['Address', {}],
            name: [
                'Name',
                {
                    readOnly: true,
                    func: 'data => [data.selfStorage?.name, [data.address.city, data.address.state].join(","), data.address.street.split(" ").slice(1).join(" ")].filter(x => x != null).join(" - ")'
                }
            ]
        }
        // ...objectMap(Address.columnMap, (x) => `address.${x}`)
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
        };
    };
    static init = () => ({
        _id: new ObjectId(),
        address: Address.init(),
        selfStorage: undefined,
        phoneNumber: '',
        email: '',
        facilityNumber: ''
    });
    static Insert = ({ realm }: { realm: Realm }) => (
        <>
            <ID />
            <LookupField realm={realm} name='selfStorage' />
            <TextField name='facilityNumber' type='text' />
            <Address.Insert prefix='address' realm={realm} />
            <TextField name='email' display='E-mail' type='email' />
            <TextField name='phoneNumber' type='tel' />

            {/* <CalculatedControlElement
                name='name'
                deps={['address.street', 'address.city', 'address.state', 'selfStorage.name']}
                calc='name.value = [selfStorage.name.value, [address.city.value, address.state.value].join(", "), address.street.value.split(" ").slice(1).join(" ")].join(" - ")'
            />
            <LookupControl name='selfStorage' displayName='Company' realm={realm} /> */}
        </>
    );
}
