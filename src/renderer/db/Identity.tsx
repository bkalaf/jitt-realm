import { ObjectId } from 'bson';
import { Dictionary } from 'realm';
import { IIdentity } from './IIdentity';

export const schema = {
    name: 'identity',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        id: 'int',
        ids: 'int{}'
    }
};

export class Identity implements IIdentity {
    static schema = schema;
    ids: Dictionary & Record<string, number>;
    _id: ObjectId;
    constructor() {
        this._id = new ObjectId();
        console.log(`previous: ${JSON.stringify((this as any)?.ids ?? 'null') ?? '<undefined>'}`);
        this.ids = {} as any;
    }
}