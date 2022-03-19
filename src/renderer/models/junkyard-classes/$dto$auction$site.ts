// DTO $dto$auction$site

const auctionSiteSchema = {
    name: 'auction-site',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
        website: 'string?'
    }
};