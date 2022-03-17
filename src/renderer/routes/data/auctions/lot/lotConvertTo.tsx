import { Facility } from '../facility/Facility';
import { AuctionSite } from '../site/index';
import { ObjectId } from 'bson';
import { $$names } from '../../../controls/index';
import { lookupObject } from '../../../../util/lookupObject';

export function lotConvertTo(obj: any, realm: Realm) {
    const dto = JITTRegistrar.getInitial('lot')();
    dto._id = new ObjectId(obj._id);
    dto.auctionID = obj.auctionID;
    dto.closeDate = new Date(Date.parse(obj.closeDate));
    dto.unit = obj.unit;
    dto.unitSize = obj.unitSize;
    dto.cleanout = parseInt(obj.cleanout, 10);
    dto.cost = JITTRegistrar.getConvert('cost')(obj.cost);
    dto.facility = lookupObject<Facility>(realm, 'facility')(obj.facility);
    dto.auctionSite = lookupObject<AuctionSite>(realm, $$names.auctions.auctionSite)(obj.auctionSite);
    dto.invoice = lookupObject<File>(realm, $$names.files.file)(obj.invoice);
    return dto;
}
