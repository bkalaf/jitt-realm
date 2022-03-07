import { dt, routeNames } from '../../../constants';
import { ObjectId } from 'bson';

export type SelfStorage = {
    _id: ObjectId;
    name: string;
    website?: string;
    facilities: Realm.Object[];
};
export class SelfStorageDTO {
    static schema = {
        name: routeNames.auctions.selfStorage,
        primaryKey: '_id',
        properties: {
            _id: dt.objectId,
            name: dt.string,
            website: dt.opt.string,
            facilities: {
                type: dt.linkingObjects,
                objectType: routeNames.auctions.facility,
                property: 'selfStorage'
            }
        }
    };
    toLookup() {
        const dto = this as any as SelfStorage;
        return dto.name;
    }
}
