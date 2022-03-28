import { countryMap } from '../db/enums/CountryISO2';
import { provinceMap } from '../db/enums/Provinces';
import { $$schemaOC } from '../models';
import { AutoComplete } from '../routes/enums/AutoComplete';

export const MAPPER = {
    facility: {
        typeName: 'facility',
        ctor: 'FacilityDTO',
        sort: [
            ['selfStorage.name', false],
            ['address.state', false],
            ['address.city', false]
        ],
        format: "(x) => [x?.selfStorage?.name, [x?.address?.city, x?.address?.state].join(','), x?.address?.street?.split(' ').slice(1).join(' ')].join('-')",
        fields: {
            2: {
                columnName: 'selfStorage',
                displayName: 'Storage',
                init: 'undefined',
                elementType: 'dropdown',
                props: {
                    lookup: 'self-storage',
                    required: true
                },
                format: 'x => x?.name',
                type: { kind: 'object', typeName: 'self-storage', optional: true }
            },
            3: {
                columnName: 'address',
                displayName: 'Address',
                init: '',
                elementType: 'fieldset',
                props: {},
                type: { kind: 'object', typeName: 'address', optional: false }
            },
            4: {
                columnName: 'facilityNumber',
                displayName: 'Facility #',
                init: '',
                elementType: 'textbox',
                props: {
                    type: 'text'
                },
                type: { kind: 'primitive', optional: true, typeName: 'string' } as IPrimitive
            },
            5: {
                columnName: 'phoneNumber',
                displayName: 'Phone',
                init: '',
                elementType: 'textbox',
                props: {
                    title: 'Do not insert punctuation or spacing.',
                    placeholder: 'ex: 8005551212',
                    type: 'tel',
                    pattern: '^(?[0-9]{3})?[ ]?[0-9]{3}[-]?[0-9]{4}$',
                    minLength: 10,
                    maxLength: 10
                },
                format: '(x) => `(${x.substring(0,3)}) ${x.substring(3, 6)}-${x.substring(6)}`',
                preSave: "(x) => compR(compR(compR(compR(replaceAll(' ', ''), replaceAll('(', '')), replaceAll(')', '')), replaceAll('-', '')), replaceAll('.', ''))(x)"
            },
            6: {
                columnName: 'email',
                displayName: 'E-mail',
                init: '',
                elementType: 'link',
                props: {
                    inner: 'textbox',
                    placeholder: 'ex: john.doe@example.com',
                    type: 'email',
                    hyperlink: 'x => `mailto:${x.email?.toString()}`'
                },
                format: 'x => `mailto:${x.email?.toString()}`',
                preSave: 'x => x?.trim()'
            },
            7: {
                columnName: 'lots',
                displayName: 'Auction Lots',
                init: '() => []',
                elementType: 'list',
                props: {
                    innerEl: 'textbox',
                    filtered: 'facility == null',
                    sorted: [['facility.selfStorage.name'], ['closeDate', true], ['facility.address.state'], ['facility.address.city']]
                },
                format: 'x => x.name',
                type: { kind: 'linkingObjects', objectType: { kind: 'object', typeName: 'auction-lot', optional: true } }
            }
        }
    },
    'self-storage': {
        typeName: 'self-storage',
        ctor: undefined as any,
        sort: [['name', false]],
        format: 'x => x.name',
        fields: {
            2: {
                columnName: 'name',
                displayName: 'Name',
                init: '',
                elementType: 'textbox',
                props: {
                    minLength: 5,
                    required: false,
                    type: 'text'
                },
                type: { kind: 'primitive', optional: false, typeName: 'string' }
            },
            3: {
                columnName: 'website',
                displayName: 'URL',
                init: '',
                elementType: 'link',
                props: {
                    minLength: 5,
                    type: 'url',
                    required: false,
                    pattern: '^https?://'
                },
                type: { kind: 'primitive', optional: true, typeName: 'string' }
            },
            4: {
                columnName: 'facilities',
                displayName: 'Facilities',
                init: '() => []',
                elementType: 'list',
                props: {
                    innerEl: 'textbox',
                    filtered: 'selfStorage == null',
                    sorted: [
                        ['address.state', false],
                        ['address.city', false]
                    ]
                },
                format: 'x => x.name',
                type: { kind: 'linkingObjects', objectType: { kind: 'object', typeName: 'facility', optional: true } }
            }
        }
    },
    'auction-site': {
        typeName: 'auction-site',
        ctor: undefined as any,
        sort: [['name', false]],
        format: 'x => x.name',
        fields: {
            2: {
                columnName: 'name',
                displayName: 'Name',
                init: '',
                elementType: 'textbox',
                props: {
                    required: true,
                    minLength: 5,
                    type: 'text'
                },
                type: { kind: 'primitive', optional: false, typeName: 'string' }
            },
            3: {
                columnName: 'website',
                displayName: 'URL',
                init: '',
                elementType: 'link' as IElements,
                props: {
                    type: 'url',
                    pattern: '^https?://',
                    minLength: '5'
                },
                type: { kind: 'primitive', optional: true, typeName: 'string' }
            }
        }
    },
    baseEntity: {
        typeName: '',
        ctor: undefined as any,
        sort: [],
        format: '',
        fields: {
            0: {
                columnName: '_id',
                displayName: '',
                elementType: 'hide',
                init: '() => new ObjectId()',
                props: {
                    required: true,
                    readOnly: true,
                    type: 'text'
                },
                format: '(x) => x._id?.toHexString()',
                type: { kind: 'primitive', typeName: 'objectId', optional: false }
            },
            1: {
                columnName: 'id',
                displayName: 'ID',
                elementType: 'textbox',
                init: '0',
                props: {
                    required: true,
                    readOnly: true,
                    type: 'text'
                },
                format: '(x) => x.toString().padStart(8, "0")',
                type: { kind: 'primitive', optional: false, typeName: 'int' }
            },
            95: {
                columnName: 'created',
                displayName: 'Created',
                elementType: 'output' as IElements,
                props: {
                    calculated: true,
                    readOnly: true,
                    type: 'text'
                },
                format: '(x) => x?._id?.getTimestamp()?.toDateString()',
                type: { kind: 'primitive', optional: false, typeName: 'date' }
            },
            96: {
                columnName: 'modified',
                displayName: 'Changed',
                elementType: 'output',
                props: {
                    calculated: true,
                    readOnly: true,
                    type: 'text'
                },
                format: 'x => x?.modified?.toDateString()',
                type: { kind: 'primitive', optional: false, typeName: 'date' }
            }
        }
    },
    address: {
        typeName: 'address',
        ctor: $$schemaOC.filter((x) => x.schema.name === 'address'),
        sort: [
            ['state', false],
            ['city', false]
        ],
        format: "(x) => [x.suite ? `${x.street}, Suite ${x.suite}` : x.street, `${x.city}, ${x.state} ${x.postal}`, `${x.country}`].join('\n')",
        fields: {
            0: {
                columnName: 'street',
                displayName: 'Street',
                elementType: 'textbox',
                init: '',
                props: { autoComplete: 'street', placeholder: 'ex: 1234 Main St', title: 'Do not insert any punctuation: periods, commas, dashes, etc.', type: 'text' },
                type: { kind: 'primitive', optional: true, typeName: 'string' }
            },
            1: { columnName: 'suite', displayName: 'Suite', elementType: 'textbox', init: '', props: { type: 'text' }, type: { kind: 'primitive', optional: true, typeName: 'string' } },
            2: {
                columnName: 'city',
                displayName: 'City',
                elementType: 'textbox',
                init: '',
                props: { required: true, autoComplete: 'city', placeholder: 'ex: Los Angeles or Atlanta', type: 'text' },
                type: { kind: 'primitive', optional: false, typeName: 'string' }
            },
            3: {
                columnName: 'state',
                displayName: 'State',
                elementType: 'dropdown',
                init: 'CA',
                props: { required: true, enum: provinceMap, autoComplete: 'state' as AutoComplete, pattern: '^[A-Z][A-Z]$', maxLength: 2 },
                type: { kind: 'primitive', optional: false, typeName: 'string' }
            },
            4: {
                columnName: 'country',
                displayName: 'Country',
                elementType: 'dropdown',
                init: 'US',
                props: { required: true, enum: countryMap, autoComplete: 'country', pattern: '^[A-Z][A-Z]$', maxLength: 2 },
                type: { kind: 'primitive', optional: false, typeName: 'string' }
            },
            5: {
                columnName: 'postal',
                displayName: 'Postal Code',
                elementType: 'textbox',
                init: '',
                props: {
                    pattern: '^[0-9]{5}(-?[0-9]{4})?$|^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][ -]?[0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9]$',
                    autoComplete: 'postalCode' as AutoComplete,
                    placeholder: 'ex: 91210 or A1A 1A1',
                    type: 'text'
                },
                type: { kind: 'primitive', optional: true, typeName: 'string' }
            }
        }
    }
};
