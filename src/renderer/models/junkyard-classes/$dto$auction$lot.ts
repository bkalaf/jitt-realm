// DTO $dto$auction$lot
// FIXME $dto$auction$lot 


const lotSchema = {
    name: 'lot',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        auctionID: 'string?',
        auctionSite: 'auction-site',
        cleanout: 'int?',
        closeDate: 'date',
        cost: 'cost',
        facility: 'facility',
        invoice: 'file',
        size: 'string?',
        unit: 'string?',
        unitSize: 'string?'
    }
};