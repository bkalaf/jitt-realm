import { ObjectId } from 'bson';
import { Reflector } from '../..';
import { IOptionalProperty } from '../../../../common/types/IOptionalProperty';
import { IDBAudit } from '../../embedded/Audit/IAuditEntryObj';
import { ILinkingObjects, ObjectSchema, ROUTES, $toPropName } from '../../junkyard-classes';

const schema: ObjectSchema = {
    name: ROUTES.AUCTIONS.SELF_STORAGE,
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        id: { type: 'int', default: -1 },
        name: { type: 'string', default: '' },
        website: 'string?',
        facilities: {
            type: 'linkingObjects',
            objectType: ROUTES.AUCTIONS.FACILITY,
            property: $toPropName(ROUTES.AUCTIONS.SELF_STORAGE)
        }
    }
};

// DTO db.auctions.self-storage
export class DBSelfStorage {
    static schema = schema;
    public _id: ObjectId;
    public id: number;
    public name: string;
    public website: IOptionalProperty<string>;
    public facilities: ILinkingObjects;
    history: IDBAudit[];
    constructor() {
        this._id = new ObjectId();
        this.name = '';
        this.website = undefined;
        this.facilities = [];
        this.id = Reflector.$()?.autoIncrement('self-storage');
        this.history = [];
    }
}
