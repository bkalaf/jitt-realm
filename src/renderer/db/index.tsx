import { FacilityDTO } from '../routes/data/auctions/facility/index';
import { SelfStorageDTO } from '../routes/data/auctions/selfStorage/index';
import { ObjectClass } from 'realm';
import { LotDTO } from '../routes/data/auctions/lot/index';
import { AuctionSiteDTO } from '../routes/data/auctions/site/index';
import { FileLocationDTO } from '../routes/data/files/fileInfo/fileLocation';
import { FileDTO } from '../routes/data/files/fileInfo';
import { CostDTO } from '../routes/embedded/cost';
import { AddressDTO } from '../dtos/AddressDTO';
import { Identity } from './Identity';

export const schema: Array<ObjectClass> = [SelfStorageDTO, AddressDTO, FacilityDTO, CostDTO, AuctionSiteDTO, LotDTO, FileLocationDTO, FileDTO, Identity];

(globalThis as any).schema = schema;
export const $$Schema: Record<string, JittClass<any>> = {
    // ['$SelfStorage']: SelfStorage as JittClass<SelfStorage>,
    // ['$Address']: Address as JittClass<Address>,
    // ['$Facility']: Facility as JittClass<Facility>
};
