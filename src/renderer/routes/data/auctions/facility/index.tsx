/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { $$datatypes, $$names } from '@controls/constants';
import { SelfStorage } from '../selfStorage';
import { provinceMap, Provinces } from '../../../../db/enums/Provinces';
import { CountryISO2, countryMap } from '../../../../db/enums/CountryISO2';
import { identity } from '../../../../../common/identity';
import { SelectControl, FieldSetControl, OutputControl, ObjectId } from '@controls/index';
import { toHexString } from '../lot/toHexString';
import { $InputControl } from '../../../controls/SafeInputControl';
import { replaceAll } from '../../../../../common/text/replaceAll';
import { InsertForm } from '../../../forms/InsertForm';
import { Address, addressInitial } from '../../../embedded/address';
import { $FieldSetControl } from '../../../controls/$FieldSetControl';

export type Facility = {
    _id: ObjectId;
    facilityNumber?: string;
    email?: string;
    phoneNumber?: string;
    address?: Address;
    selfStorage?: SelfStorage;
    get name(): string;
};
export class FacilityDTO {
    static schema: Realm.ObjectSchema = {
        name: $$names.auctions.facility,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            selfStorage: {
                type: $$names.auctions.selfStorage,
                optional: true
            },
            facilityNumber: $$datatypes.opt.string,
            address: {
                type: $$names.embedded.address
            },
            email: $$datatypes.opt.string,
            phoneNumber: $$datatypes.opt.string
        }
    };
    get name() {
        const dto = this as any as Facility;
        return `${dto.selfStorage?.name ?? ''} - ${dto.address?.city ?? ''}, ${dto.address?.state ?? ''} - ${dto.address?.street?.split(' ').slice(1).join(' ') ?? ''}`;
    }
    toLookup() {
        const dto = this as any as Facility;
        return dto.name;
    }
}

export const facilityInitial = (): Facility => {
    const facility: Facility = new FacilityDTO() as any;
    facility._id = new ObjectId();
    facility.phoneNumber = '';
    facility.email = '';
    facility.address = addressInitial();
    facility.facilityNumber = '';
    Object.defineProperty(facility, 'name', {
        get: function (this: any) {
            return `${this.selfStorage?.name ?? ''} - ${this.address?.city ?? ''}, ${this.address?.state ?? ''} - ${this.address?.street?.split(' ').slice(1).join(' ') ?? ''}`;
        }
    });
    return facility;
    // const result: Facility = {
    //     _id: new ObjectId(),
    //     phoneNumber: '',
    //     email: '',
    //     address: {
    //         street: '',
    //         suite: '',
    //         city: '',
    //         state: 'CA' as Provinces,
    //         country: 'US' as CountryISO2,
    //         postal: ''
    //     },
    //     facilityNumber: '',
    //     selfStorage: undefined as SelfStorage | undefined
    // } as any;
    //
    // console.log(`result: `, result);
    // console.log(`facility.name: `, result.name);
    // return result;
};

export function compR<T, U, V>(f: (x: T) => U, g: (x: U) => V) {
    return (x: T) => g(f(x));
}

export type OneLess<T extends any[]> = ((...args: T) => any) extends (head: any, ...tail: infer R) => any ? R['length'] : 0;

export type AnyFunction = (...args: any[]) => any;
// export function compManyR<F extends AnyFunction, T extends any[]>(...funcs: T) {
//     return function<T>(x: T[0]) {
//         return funcs.reduce(compR as any, x) as ReturnType<Parameters<F>[OneLess<Parameters<F>>]>;
//     }
// }

function compManyR(...funcs: any[]) {
    return (x: any) => funcs.reduce(compR, x);
}
function formatTel(x: string) {
    return ['(', x.slice(3), ')', x.slice(3, 6), '-', x.slice(6)].join('');
}
export const parseTel = compManyR(replaceAll('-', ''), replaceAll('(', ''), replaceAll(')', ''), replaceAll(' ', ''));
export const echoString = (x: string) => x;
export function FacilityInsertForm({ realm }: { realm: Realm }) {
    return (
        <InsertForm>
            <OutputControl name='name' span={2} />
            <$InputControl name='facilityNumber' type='text' validators={[]} stringify={echoString} parse={identity} />
            <SelectControl name='selfStorage' lookup={$$names.auctions.selfStorage} toOutput={toHexString} />
            <$InputControl name='phoneNumber' type='tel' placeholder='(619) 555-1212' stringify={formatTel} parse={parseTel} autoComplete='tel' validators={[]} />
            {/* <InputControl name='phoneNumber' inputType='tel' placeholder='(619) 555-1212' /> */}
            <$InputControl name='email' type='email' placeholder='john.doe@example.com' validators={[]} stringify={echoString} parse={identity} />
            <$FieldSetControl name='address'>
                <$InputControl name='street' type='text' validators={[]} parse={identity} stringify={echoString} autoComplete='street' />
                <$InputControl name='suite' validators={[]} parse={identity} stringify={echoString} type='text' />
                <$InputControl name='city' validators={[]} parse={identity} stringify={echoString} type='text' autoComplete='city' />
                <SelectControl name='state' map={provinceMap} autoComplete='state' toOutput={identity} />
                <SelectControl name='country' map={countryMap} autoComplete='country' toOutput={identity} />
                <$InputControl name='postal' validators={[]} parse={identity} stringify={echoString} type='text' autoComplete='postalCode' />
            </$FieldSetControl>
        </InsertForm>
    );
}
