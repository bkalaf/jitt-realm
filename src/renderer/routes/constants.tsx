export const $SelfStorage = 'SelfStorage';
export const $Address = 'Address';
export const $Facility = 'Facility';

export const routeNames = {
    tier1: {
        api: 'api',
        data: 'data',
        todos: 'todos',
        reports: 'reports'
    },
    tier2: {
        auctions: 'auctions',
        products: 'products',
        inventory: 'inventory',
        files: 'files',
        listings: 'listings',
        fulfillment: 'fulfillment',
        expenses: 'expenses'
    },
    auctions: {
        selfStorage: 'self-storage',
        facility: 'facility',
        lot: 'lot',
        auctionSite: 'auction-site'
    },
    products: {
        products: 'product',
        barcodes: 'barcode',
        brands: 'brand',
        categories: 'category',
        productDetails: 'detail'
    },
    inventory: {
        skus: 'sku',
        bins: 'bin',
        items: 'item',
    },
    files: {
        images: 'image',
        versions: 'version',
        attachments: 'attachment',
        documents: 'document'
    },
    embedded: {
        address: 'address',
        category: 'category',
        subcategory: 'subcategory',
        subsubcategory: 'subsubcategory',
        cost: 'cost',
        measure: 'measure',
        length: 'length',
        weight: 'weight',
        volume: 'volume',
        time: 'time',
        capacity: 'capacity',
        voltage: 'voltage',
        transaction: 'transaction',
        squareFootage: 'square-footage'
    }
};
export const dt = {
    objectId: 'objectId',
    string: 'string',
    int: 'int',
    float: 'float',
    double: 'double',
    linkingObjects: 'linkingObjects',
    decimal128: 'decimal128',
    data: 'data',
    date: 'date',
    bool: 'bool',
    uuid: 'uuid',
    opt: {
        string: 'string?',
        int: 'int?',
        float: 'float?',
        double: 'double?',
        data: 'data?',
        date: 'date?',
        bool: 'bool?',
        uuid: 'uuid?'
    },
    list: {
        string: 'string[]',
        objectId: 'objectId[]',
        float: 'float[]',
        date: 'date[]',
        data: 'data[]',
        bool: 'bool[]',
        uuid: 'uuid[]',
        int: 'int[]'
    },
    dictionary: {
        any: '{}',
        string: 'string{}'
    },
    set: {
        string: 'string<>'
    }
};
