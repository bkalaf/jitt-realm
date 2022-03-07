import { CountryISO2 } from '../../../db/enums/CountryISO2';
import { Provinces } from '../../../db/enums/Provinces';
import { dt, routeNames } from '../../constants';

export type Address = {
    street?: string;
    suite?: string;
    city?: string
    state: Provinces;
    country: CountryISO2;
    postal?: string;
}
export class AddressDTO {
    static schema: Realm.ObjectSchema = {
        name: routeNames.embedded.address,
        embedded: true,
        properties: {
            street: dt.opt.string,
            suite: dt.opt.string,
            city: dt.opt.string,
            state: { type: dt.opt.string, default: 'CA' },
            country: { type: dt.opt.string, default: 'US' },
            postal: dt.opt.string
        }
    };
}
