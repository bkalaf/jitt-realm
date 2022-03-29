// DTO $dto$auction$lot
// FIXME $dto$auction$lot 

import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { Reflector } from '../..';
import { IOptionalProperty } from '../../../../common/types/IOptionalProperty';
import { IDBAudit } from '../../embedded/Audit/IAuditEntryObj';
import { CostObj } from '../../embedded/Cost/CostObj';
import { ROUTES } from '../../junkyard-classes';
import { DBFacility } from '../DBFacility/DBFacility';

const schema: ObjectSchema = {
    name: ROUTES.AUCTIONS.AUCTION_LOT,
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        id: 'int',
        auctionID: 'string?',
        auctionSite: ROUTES.AUCTIONS.AUCTION_SITE,
        cleanout: 'int?',
        closeDate: 'date',
        cost: ROUTES.$.COST,
        facility: ROUTES.AUCTIONS.FACILITY,
        invoice: ROUTES.FILES.FILE_INFO,
        size: 'string?',
        unit: 'string?',
        unitSize: 'string?'
    }
};

export class DBAuctionLot {
    _id: ObjectId;
    id: number;
    auctionID: IOptionalProperty<string>;
    auctionSite: IOptionalProperty<Realm.Object>;
    cleanout: IOptionalProperty<number>;
    closeDate: Date; 
    facility: IOptionalProperty<DBFacility>;
    invoice: IOptionalProperty<Realm.Object>;
    size: IOptionalProperty<string>;
    cost: CostObj;
    unit: IOptionalProperty<string>;
    unitSize: IOptionalProperty<string>;
    static schema = schema;
    history: IDBAudit[];
    constructor() {
        this._id = new ObjectId();
        this.id = Reflector.$()?.autoIncrement('lot');
        this.closeDate = new Date(Date.now());
        this.cost = new CostObj();
        this.history = [];
    }
}