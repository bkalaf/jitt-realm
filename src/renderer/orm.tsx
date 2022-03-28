import { replaceAll } from '../common/text/replaceAll';
import { IFieldInfo, IRealmObjectInfo } from './models/junkyard-classes/IFieldInfo';
import { ITypeInfo } from './models/junkyard-classes/LinkedObject';

const trim = (s: string | undefined) => (s != null ? s.trim() : s);
const removeSpace = (s: string | undefined) => (s != null ? replaceAll(' ', '')(s) : '');

export const ORM = Object.fromEntries(new Map([
    [
        'address',
        {
            name: 'address',
            objectKind: [true],
            fields: Object.fromEntries(
                new Map<string, IFieldInfo<any>>([
                    [
                        'street',
                        {
                            displayName: 'Street',
                            default: '',
                            type: [true, 'string'],
                            elementType: 'input',
                            index: 0,
                            props: {
                                autoComplete: 'street',
                                type: 'text',
                                placeholder: 'ex: 1234 Main St'
                            }
                        }
                    ],
                    [
                        'suite',
                        {
                            displayName: 'Suite',
                            default: '',
                            type: [true, 'string'],
                            elementType: 'input',
                            index: 1,
                            props: {
                                type: 'text',
                                placeholder: 'ex: 123-B'
                            }
                        }
                    ],
                    [
                        'city',
                        {
                            displayName: 'City',
                            default: '',
                            type: [false, 'string'],
                            elementType: 'input',
                            index: 2,
                            props: {
                                autoComplete: 'city',
                                type: 'text',
                                required: true,
                                placeholder: 'ex: Los Angeles'
                            }
                        }
                    ],
                    [
                        'state',
                        {
                            displayName: 'State/Province',
                            default: 'CA',
                            type: [false, 'string'],
                            elementType: 'select',
                            index: 3,
                            props: {
                                autoComplete: 'state',
                                lookup: 'provinceMap',
                                required: true
                            }
                        }
                    ],
                    [
                        'country',
                        {
                            displayName: 'Country',
                            default: 'US',
                            type: [false, 'string'],
                            elementType: 'select',
                            index: 4,
                            props: {
                                autoComplete: 'country',
                                lookup: 'countryMap',
                                required: true
                            }
                        }
                    ],
                    [
                        'postal',
                        {
                            displayName: 'Zip/Postal Code',
                            default: '',
                            type: [true, 'string'],
                            elementType: 'input',
                            index: 5,
                            props: {
                                autoComplete: 'postalCode',
                                pattern:
                                    '^[0-9]{5}(-?[0-9]{4})?$|^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][ -]?[0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9]$',
                                type: 'text',
                                placeholder: 'ex: 90210'
                            }
                        }
                    ]
                ] as [string, IFieldInfo<any>][])
            )
        }
    ]
]));

console.log(JSON.stringify(Object.fromEntries(Object.entries(ORM)), null, '\t'));
