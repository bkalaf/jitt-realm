import { $$datatypes, $$names } from '@controls/constants';

export class AddressDTO {
    constructor() {
        console.log('THAT', this);
        const dto = this as any;
        dto.street = '';
        dto.suite = '';
        dto.city = '';
        dto.state = 'CA';
        dto.country = 'US';
        dto.postal = '';
        console.log('DTO', dto);
        console.log('THAT', this);
    }
    static schema: Realm.ObjectSchema = {
        name: $$names.embedded.address,
        embedded: true,
        properties: {
            street: { type: $$datatypes.opt.string, default: '' },
            suite: { type: $$datatypes.opt.string, default: '' },
            city: { type: $$datatypes.opt.string, default: '' },
            state: { type: $$datatypes.string, default: 'CA' },
            country: { type: $$datatypes.string, default: 'US' },
            postal: { type: $$datatypes.opt.string, default: '' }
        }
    };
}
