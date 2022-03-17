import { CountryISO2 } from '../../db/enums/CountryISO2';
import { Provinces } from '../../db/enums/Provinces';
import { $$names, $$datatypes } from '../controls/index';

export type Address = {
    street?: string;
    suite?: string;
    city?: string;
    state: Provinces;
    country: CountryISO2;
    postal?: string;
};
export class AddressDTO {
    static schema: Realm.ObjectSchema = {
        name: $$names.embedded.address,
        embedded: true,
        properties: {
            street: $$datatypes.opt.string,
            suite: $$datatypes.opt.string,
            city: $$datatypes.opt.string,
            state: { type: $$datatypes.opt.string, default: 'CA' },
            country: { type: $$datatypes.opt.string, default: 'US' },
            postal: $$datatypes.opt.string
        }
    };
}
export const addressInitial = () => {
    const address = {} as any;
    address.city = '';
    address.state = 'CA';
    address.country = 'US';
    address.postal = '';
    address.suite = '';
    address.street = '';
    return address;
};
export const addressConvertIn = (obj: any) => {
    return obj;
}