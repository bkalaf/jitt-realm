import { CountryCode } from './CountryCode';
import { ProvinceCode } from './ProvinceCode';

export interface I$dto$address {
    street?: string;
    suite?: string;
    city?: string;
    state: ProvinceCode;
    country: CountryCode;
    postal?: string;
    readonly cityState: string;
    readonly streetOnly: string;
}
