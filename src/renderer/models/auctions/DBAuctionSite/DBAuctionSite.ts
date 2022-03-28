// DTO $dto$auction$site

import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { Reflector } from '../..';

const schema: ObjectSchema = {
    name: 'auction-site',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        id: 'int',
        name: 'string',
        website: 'string?'
    }
};

export class DBAuctionSite  {
    static schema = schema;
    _id: ObjectId;
    id: number;
    name: string;
    website?: string;
    constructor() {
        this._id = new ObjectId();
        this.id = global.autoIncrement('auction-site');
        this.name = '';
    }
}