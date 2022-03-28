import { $$names, $$datatypes } from '../../../controls/index';
import { SelfStorage } from './SelfStorage';

export class SelfStorageDTO {
    static schema = {
        name: $$names.auctions.selfStorage,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            id: $$datatypes.int,
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
