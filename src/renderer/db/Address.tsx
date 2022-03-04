import Realm from 'realm';
import { provinceMap, Provinces } from './enums/Provinces';
import { CountryISO2, countryMap } from './enums/CountryISO2';
import { ifEmpty } from '.';
import { identity } from '../../common/identity';
import { $provinces, $countries, ControlBase } from '../components/forms';
import { trim } from '../../common/text/trim';
import { InputControl } from '../components/forms/InputControl';
import { useDataList } from '../hooks/useDataList';

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
    street: string | undefined = '';
    suite: string | undefined = '';
    city: string | undefined = '';
    postal: string | undefined = '';
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
            [[obj.city, obj.state].join(', '), obj.country, obj.postal].join(',')
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
    static convertTo = (obj: Record<string, any>, realm?: Realm) => ({
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
    static Insert = function <T, TElement extends DataEntryElement>(props: { prefix: string }) {
        return (
            <ControlBase
                containerTag='fieldset'
                labelTag='legend'
                displayName='Address'
                name='address'
                toBacking={identity}
                toOutput={identity}
                validators={[]}
                initial={
                    ((): Record<string, string> => {
                        return {} as any;
                    }) as any
                }></ControlBase>
        );

        // <FieldSetControl label='Address' name='address' id='address-fieldset' aria-labelledby='address-fieldset-legend'>
        //     <InputControlElement name={`${props.prefix}.street`} displayName='Street' convert={identity} stringify={trim} />
        //     <InputControlElement name={`${props.prefix}.suite`} displayName='Suite' convert={identity} stringify={trim} />
        //     <InputControlElement name={`${props.prefix}.city`} displayName='City' convert={identity} stringify={trim} />
        //     <DataListControlElement
        //         name={`${props.prefix}.state`}
        //         displayName='State/Province'
        //         convert={(x: string) => x}
        //         list={$provinces}></DataListControlElement>
        //     <DataListControlElement
        //         name={`${props.prefix}.country`}
        //         displayName='Country'
        //         convert={(x: string) => x}
        //         list={$countries}></DataListControlElement>
        //     <InputControlElement name={`${props.prefix}.postal`} displayName='Postal Code' convert={identity} stringify={trim} />
        // </FieldSetControl>
    };
}
