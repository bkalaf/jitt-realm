// DTO $dto$facility

import { ObjectId } from 'bson';
import { Reflector } from '../..';
import { DBSelfStorage } from '../DBSelfStorage/DBSelfStorage';
import { AddressObj } from '../../embedded/Address/AddressObj';
import { IDTOFacility } from './IDTOFacility';
import { IOptionalProperty } from '../../../../common/types/IOptionalProperty';
import { ILinkingObjects, ROUTES } from '../../junkyard-classes';
import { IDBAudit } from '../../embedded/Audit/IAuditEntryObj';

const schema = {
    name: ROUTES.AUCTIONS.FACILITY,
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        id: 'int',
        address: ROUTES.$.ADDRESS,
        email: 'string?',
        facilityNumber: 'string?',
        phoneNumber: 'string?',
        selfStorage: ROUTES.AUCTIONS.SELF_STORAGE,
        lots: {
            type: 'linkingObjects',
            objectType: ROUTES.AUCTIONS.AUCTION_LOT,
            property: ROUTES.AUCTIONS.FACILITY
        }
    }
};

export class DBFacility implements IDTOFacility {
    static schema = schema;
    public _id: ObjectId;
    public id: number;
    public address: AddressObj;
    facilityNumber: IOptionalProperty<string>;
    phoneNumber: IOptionalProperty<string>;
    public selfStorage: IOptionalProperty<DBSelfStorage>;
    public lots: Realm.Object[];
    history: IDBAudit[];
    constructor() {
        this._id = new ObjectId();
        this.id = Reflector.$()?.autoIncrement('facility');
        this.address = new AddressObj();
        this.lots = [];
        this.history = [];
    }

}
