import { SelfStorage } from './SelfStorage';
import { Address } from './Address';
import { Facility } from './Facility';
import { FacilityDTO } from '../routes/data/auctions/facility';
import { SelfStorageDTO } from '../routes/data/auctions/selfStorage';
import { ObjectClass } from 'realm';
import { LotDTO } from '../routes/data/auctions/lot';
import { AuctionSiteDTO } from '../routes/data/auctions/site';
import { AddressDTO } from '../routes/embedded/address';
import { CostDTO } from '../routes/embedded/cost';

export function ifEmpty(str: string) {
    return str != null ? str : undefined;
}

export type Objs = SelfStorage | Address | Facility;
export const schema: Array<ObjectClass> = [SelfStorageDTO, AddressDTO, FacilityDTO, CostDTO, AuctionSiteDTO, LotDTO];

export const $$Schema: Record<string, JittClass<any>> = {
    ['$SelfStorage']: SelfStorage as JittClass<SelfStorage>,
    ['$Address']: Address as JittClass<Address>,
    ['$Facility']: Facility as JittClass<Facility>
};
