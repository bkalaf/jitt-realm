import { CountryISO2 } from '../../db/enums/CountryISO2';
import { Provinces } from '../../db/enums/Provinces';

export type Address = {
    street?: string;
    suite?: string;
    city?: string;
    state: Provinces;
    country: CountryISO2;
    postal?: string;
};
