/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { $$datatypes, $$names } from '@controls/constants';
import { SelfStorage } from '../selfStorage';
import { Address } from '../../../embedded/address';
import { InsertForm } from '../../../forms/InsertForm';
import { provinceMap, Provinces } from '../../../../db/enums/Provinces';
import { CountryISO2, countryMap } from '../../../../db/enums/CountryISO2';
import { identity } from '../../../../../common/identity';
import { InputControl, SelectControl, FieldSetControl, OutputControl, ObjectId } from '@controls/index';
import { toHexString } from '../lot/toHexString';

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
        return `${dto.selfStorage?.name ?? ''} - ${dto.address?.city ?? ''}, ${dto.address?.state ?? ''} - ${
            dto.address?.street?.split(' ').slice(1).join(' ') ?? ''
        }`;
    }
    toLookup() {
        const dto = this as any as Facility;
        return dto.name;
    }
}

export const facilityInitial = (): Facility => {
    const facility: Facility = { } as any;
    facility._id = new ObjectId();
    facility.phoneNumber = '';
    facility.email = '';
    facility.address = {
        street: '',
        suite: '',
        city: '',
        state: 'CA' as Provinces,
        country: 'US' as CountryISO2,
        postal: ''
    };
    facility.facilityNumber = '';
    Object.defineProperty(facility, 'name', {
        get: function (this: any) {
            return `${this.selfStorage?.name ?? ''} - ${this.address?.city ?? ''}, ${this.address?.state ?? ''} - ${
                this.address?.street?.split(' ').slice(1).join(' ') ?? ''
            }`;
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

export function FacilityInsertForm({ realm }: { realm: Realm }) {
    return (
        <InsertForm realm={realm} type={$$names.auctions.facility} initial={facilityInitial}>
            <OutputControl name='name' span={2} />
            <InputControl name='facilityNumber' inputType='text' />
            <SelectControl
                name='selfStorage'
                lookup={$$names.auctions.selfStorage}
                toOutput={toHexString}
            />
            <InputControl name='phoneNumber' inputType='tel' placeholder='(619) 555-1212' />
            <InputControl name='email' inputType='email' placeholder='john.doe@example.com' />
            <FieldSetControl name='address'>
                <InputControl name='street' inputType='text' autoComplete='street' />
                <InputControl name='suite' inputType='text' />
                <InputControl name='city' inputType='text' autoComplete='city' />
                <SelectControl name='state' map={provinceMap} autoComplete='state' toOutput={identity} />
                <SelectControl name='country' map={countryMap} autoComplete='country' toOutput={identity} />
                <InputControl name='postal' inputType='text' autoComplete='postalCode' />
            </FieldSetControl>
        </InsertForm>
    );
}
