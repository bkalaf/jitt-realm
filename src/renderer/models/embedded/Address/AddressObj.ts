import { ProvinceCode } from './ProvinceCode';
import { CountryCode } from './CountryCode';
import { ROUTES } from '../../junkyard-classes';

const schema = {
    name: ROUTES.$.ADDRESS,
    embedded: true,
    properties: {
        city: 'string?',
        country: { type: 'string', default: 'US' },
        postal: 'string?',
        state: { type: 'string', default: 'CA' },
        street: 'string?',
        suite: 'string?'
    }
};

// DTO db.$.address
export class AddressObj {
    static schema = schema;
    public street?: string;
    public suite?: string;
    public city?: string;
    public state: ProvinceCode;
    public country: CountryCode;
    public postal?: string;
    constructor() {
        this.country = 'US';
        this.state = 'CA';
    }
    get streetOnly(): string {
        return this.street?.split(' ').slice(1).join(' ') ?? '';
    }
    get cityState(): string {
        return [this.city, this.state].join(', ');
    }
}
