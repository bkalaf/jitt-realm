import Realm from 'realm';
import { provinceMap, Provinces } from './enums/Provinces';
import { CountryISO2, countryMap } from './enums/CountryISO2';
import { ifEmpty } from '.';

export const $Address: $Address = 'Address';

export class Address {
    static schema: Realm.ObjectSchema = {
        name: $Address,
        embedded: true,
        properties: {
            street: 'string?',
            suite: 'string?',
            city: 'string?',
            state: { type: 'string?', default: 'CA' },
            country: { type: 'string?', default: 'US' },
            postal: 'string?'
        }
    };
    street: string | undefined;
    suite: string | undefined;
    city: string | undefined;
    postal: string | undefined;
    state: Provinces = 'CA';
    country: CountryISO2 = 'US';
    get streetOnly() {
        return this.street?.split(' ').slice(1).join(' ');
    }
    get cityState() {
        return [this.city, this.state].join(',');
    }
    static columns: string[] = ['street', 'suite', 'city', 'state', 'country', 'postal'];
    static columnMap: ColumnMap = {
        street: ['Street', { type: 'text' }],
        suite: ['Suite', { type: 'text' }],
        city: ['City', { type: 'text' }],
        state: ['State/Province', { size: 3, enumMap: provinceMap, required: true }],
        country: ['Country', { size: 3, enumMap: countryMap, required: true }],
        postal: ['Zip/Postal Code', { type: 'text' }]
    };
    static sort: [string, boolean][] = [];
    static toDisplayName(obj: Address) {
        return [
            [obj.street, obj.suite ? `Ste# ${obj.suite}` : null].filter((x) => x != null).join(' '),
            [obj.cityState, obj.country, obj.postal].join(',')
        ].join('\n');
    }
    static convertFrom = (obj: Address) => ({
        street: obj.street ?? '',
        suite: obj.suite ?? '',
        city: obj.city ?? '',
        state: obj.state,
        country: obj.country,
        postal: obj.postal ?? ''
    });
    static convertTo = (obj: Record<string, any>, realm?: Realm)     => ({
        street: ifEmpty(obj.street),
        suite: ifEmpty(obj.suite),
        city: ifEmpty(obj.city),
        state: ifEmpty(obj.state),
        country: ifEmpty(obj.country),
        postal: ifEmpty(obj.postal)
    });
    static init = () => ({
        street: '',
        suite: '',
        city: '',
        state: 'CA',
        country: 'US',
        postal: ''
    });
}
