export const countryMap = {
    MX: 'Mexico',
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    FR: 'France',
    CN: 'China',
    IN: 'Indonesia',
    ID: 'India'
};

export type CountryISO2 = keyof typeof countryMap;
