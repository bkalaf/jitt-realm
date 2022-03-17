export type AutoComplete = keyof typeof autoCompleteMap;
export const autoCompleteMap = {
    city: 'address-level2',
    state: 'address-level1',
    country: 'country',
    postalCode: 'postal-code',
    sex: 'sex',
    tel: 'tel',
    street: 'address-line1'
};
export function readAutoComplete(ac?: AutoComplete) {
    if (ac == null) return undefined;
    if (Object.keys(autoCompleteMap).includes(ac)) return autoCompleteMap[ac]!;
    return ac;
}
