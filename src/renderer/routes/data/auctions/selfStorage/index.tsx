import { ObjectId } from 'bson';
import { $$names, $$datatypes } from '../../../controls/index';

export type SelfStorage = {
    _id: ObjectId;
    name: string;
    website?: string;
    facilities: Realm.Object[];
};
export class SelfStorageDTO {
    static schema = {
        name: $$names.auctions.selfStorage,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            name: $$datatypes.string,
            website: $$datatypes.opt.string,
            facilities: {
                type: $$datatypes.linkingObjects,
                objectType: $$names.auctions.facility,
                property: 'selfStorage'
            }
        }
    };
    toLookup() {
        const dto = this as any as SelfStorage;
        return dto.name;
    }
}
