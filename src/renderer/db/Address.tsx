import Realm from 'realm';
import { provinceMap, Provinces } from './enums/Provinces';
import { CountryISO2, countryMap } from './enums/CountryISO2';
import { DataListField, TextField } from './TextField';
import { Field } from './Field';
import { ContainerComponent } from "./ContainerComponent";
import { LabelComponent } from "./LabelComponent";
import { useDataListPortal } from '../hooks/$useDataListPortal';
import { $countries, $provinces } from '../hooks/useProvideDataLists';
import { ifEmpty } from '../../common/src/ifEmpty';
import { ForwardComponents } from './$FC';

/**
 * @deprecated
 */
export class Address {
    static schema: Realm.ObjectSchema = {
        name: 'Address',
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
    // get streetOnly() {
    //     return this.street?.split(' ').slice(1).join(' ');
    // }
    // get cityState() {
    //     return [this.city, this.state].join(',');
    // }
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
        return [[obj.street, obj.suite ? `Ste# ${obj.suite}` : null].filter((x) => x != null).join(' '), [[obj.city, obj.state].join(', '), obj.country, obj.postal].join(',')].join('\n');
    }
    static convertFrom = (
        obj: Address
    ): {
        street: string;
        suite: string;
        city: string;
        state: string;
        country: string;
        postal: string;
    } => ({
        street: obj.street ?? '',
        suite: obj.suite ?? '',
        city: obj.city ?? '',
        state: obj.state,
        country: obj.country,
        postal: obj.postal ?? ''
    });
    static convertTo = (obj: Record<string, string>, realm?: Realm): Address => {
        const result = new Address();
        result.street = ifEmpty(obj.street);
        result.suite = ifEmpty(obj.suite);
        result.city = ifEmpty(obj.city);
        result.state = (ifEmpty(obj.state) ?? 'CA') as Provinces;
        result.country = (ifEmpty(obj.country) ?? 'US') as CountryISO2;
        result.postal = ifEmpty(obj.postal);
        return result;
    };
    static init = () => ({
        street: '',
        suite: '',
        city: '',
        state: 'CA',
        country: 'US',
        postal: ''
    });
    static Insert = function <T, TElement extends DataEntryElement>(props: { prefix: string; realm: Realm }) {
        const provinces = useDataListPortal($provinces);
        const countries = useDataListPortal($countries);
        return (
            <Field
                name='address'
                display='Address'
                converts={[Address.convertFrom, Address.convertTo]}
                labelLabel='legend'
                containerLabel='fieldset'
                Container={ForwardComponents.fieldset as ContainerComponent}
                Label={ForwardComponents.legend as LabelComponent}
            >
                {countries}
                {provinces}
                <TextField name='street' type='text' />
                <TextField name='suite' type='text' />
                <TextField name='city' type='text' />
                <DataListField name='state' display='State/Province' list={$provinces} map={provinceMap} />
                <DataListField
                    name='country'
                    list={$countries}
                    map={{
                        US: 'United States',
                        CA: 'Canada',
                        MX: 'Mexico',
                        GB: 'United Kingdom'
                    }}
                />
                <TextField name='postal' type='text' pattern={/[0-9]{5}(-?[0-9]{4})?/.toString()} />
            </Field>
            // <ControlBase
            //     containerTag='fieldset'
            //     labelTag='legend'
            //     displayName='Address'
            //     name='address'
            //     toBacking={identity}
            //     toOutput={identity}
            //     validators={[]}
            //     initial={
            //         ((): Record<string, string> => {
            //             return {} as any;
            //         }) as any
            //     }></ControlBase>
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
