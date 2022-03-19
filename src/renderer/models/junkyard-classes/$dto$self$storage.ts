const selfStorageSchema = {
    name: 'self-storage',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
        website: 'string?',
        facilities: {
            type: 'linkingObjects',
            objectType: 'facility',
            property: 'selfStorage'
        }
    }
};