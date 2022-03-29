import { caps } from '../../../common/text/caps';

export { ILinkingObjects } from '../../../common/types/ILinkingObjects';
export { ObjectId, UUID } from 'bson';
export { ObjectSchema } from 'realm';
export { EnhNumber } from '../../../common/types/EnhNumber';
export { IEnhNumber } from '../../../common/types/IEnhNumber';

export const ADDRESS = 'address';
export const COST = 'cost';
export const FILE_LOCATION = 'file-location';

export const SELF_STORAGE = 'self-storage';
export const FACILITY = 'facility';
export const AUCTION_SITE = 'auction-site';
export const AUCTION_LOT = 'auction-lot';
export const FILE_INFO = 'file-info';

export type ADDRESS = typeof ADDRESS;
export type COST = typeof COST;
export type FILE_LOCATION = typeof FILE_LOCATION;

export type SELF_STORAGE = typeof SELF_STORAGE;
export type FACILITY = typeof FACILITY;
export type AUCTION_SITE = typeof AUCTION_SITE;
export type AUCTION_LOT = typeof AUCTION_LOT;
export type FILE_INFO = typeof FILE_INFO;
export const BASE = 'baseEntity';
export type BASE = typeof BASE;

export type CHECKBOX = 'checkbox';
export const CHECKBOX: CHECKBOX = 'checkbox';
export type RADIOBOX = 'radiobox';
export const RADIOBOX: RADIOBOX = 'radiobox';
export type HIDE = 'hide';
export const HIDE: HIDE = 'hide';
export type LIST = 'list';
export const LIST: LIST = 'list';
export type COMBOBOX = 'combobox';
export const COMBOBOX: COMBOBOX = 'combobox';
export type LISTBOX = 'listbox';
export const LISTBOX: LISTBOX = 'listbox';
export type TEXTBLOCK = 'textblock';
export const TEXTBLOCK: TEXTBLOCK = 'textblock';
export type TAGS = 'tags';
export const TAGS: TAGS = 'tags';
export type TEXTBOX = 'textbox';
export const TEXTBOX: TEXTBOX = 'textbox';
export type DROPDOWN = 'dropdown';
export const DROPDOWN: DROPDOWN = 'dropdown';
export type OUTPUT = 'output';
export const OUTPUT: OUTPUT = 'output';
export type FIELDSET = 'fieldset';
export const FIELDSET: FIELDSET = 'fieldset';
export type METER = 'meter';
export const METER: METER = 'meter';
export type RANGE = 'range';
export const RANGE: RANGE = 'range';
export type LINK = 'link';
export const LINK: LINK = 'link';
export type ATTACHMENT = 'attachment';
export const ATTACHMENT: ATTACHMENT = 'attachment';
export type IMAGE = 'image';
export const IMAGE: IMAGE = 'image';
export type DATALIST = 'datalist';
export const DATALIST: DATALIST = 'datalist';
export type RECORD = 'record';
export const RECORD: RECORD = 'record';

export type $id = 'id';
export const $id: $id = 'id';
export type $_id = '_id';
export const $_id: $_id = '_id';
export type $created = 'created';
export const $created: $created = 'created';
export type $modified = 'modified';
export const $modified: $modified = 'modified';
export type AUDIT = 'audit';
export const AUDIT: AUDIT = 'audit';

export const ROUTES = {
    BASE: BASE,
    $: {
        ADDRESS: ADDRESS,
        COST: COST,
        FILE_LOCATION: FILE_LOCATION
    },
    AUCTIONS: {
        SELF_STORAGE: SELF_STORAGE,
        FACILITY: FACILITY,
        AUCTION_SITE: AUCTION_SITE,
        AUCTION_LOT: AUCTION_LOT
    },
    FILES: {
        FILE_INFO: FILE_INFO
    }
};

export function $toPropName(str: string): string {
    const [head, ...tail] = str.split('-');
    return [head, tail.map(caps)].join('');
}

export const EL = {
    ATTACHMENT: ATTACHMENT,
    CHECKBOX: CHECKBOX,
    COMBOBOX: COMBOBOX,
    DATALIST: DATALIST,
    DROPDOWN: DROPDOWN,
    FIELDSET: FIELDSET,
    HIDE: HIDE,
    IMAGE: IMAGE,
    LINK: LINK,
    LIST: LIST,
    LISTBOX: LISTBOX,
    METER: METER,
    OUTPUT: OUTPUT,
    RADIOBOX: RADIOBOX,
    RANGE: RANGE,
    RECORD: RECORD,
    TAGS: TAGS,
    TEXTBLOCK: TEXTBLOCK,
    TEXTBOX: TEXTBOX
};

export const JTT = {
    $primitive: 'primitive',
    $object: 'object',
    $linkingObjects: 'linkingObjects',
    $list: 'list',
    $dictionary: 'dictionary',
    $set: 'set',
    opt: {
        string: 'string?',
        int: 'int?',
        double: 'double?',
        decimal128: 'decimal128?',
        float: 'float?',
        bool: 'bool?',
        objectId: 'objectId?',
        uuid: 'uuid?',
        data: 'data?',
        date: 'date?'
    },
    string: 'string',
    int: 'int',
    double: 'double',
    decimal128: 'decimal128',
    float: 'float',
    bool: 'bool',
    objectId: 'objectId',
    uuid: 'uuid',
    data: 'data',
    date: 'date',
    BASE: BASE,
    AUDIT: AUDIT, 
    ADDRESS: ADDRESS,
    COST: COST,
    FILE_LOCATION: FILE_LOCATION,
    $AUCTIONS: {
        SELF_STORAGE: SELF_STORAGE,
        FACILITY: FACILITY,
        AUCTION_SITE: AUCTION_SITE,
        AUCTION_LOT: AUCTION_LOT
    },
    $FILES: {
        FILE_INFO: FILE_INFO
    }
};
