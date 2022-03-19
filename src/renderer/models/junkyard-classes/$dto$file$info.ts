const fileSchema = {
    name: 'file',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        createDate: 'date',
        data: 'data',
        hash: 'string',
        ids: 'string{}',
        isUnassigned: 'bool',
        itemType: 'string?',
        location: 'file-location',
        mimeType: 'string',
        modifiedDate: 'date',
        size: 'int',
        type: 'string?'
    }
};