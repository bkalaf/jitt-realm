import { ObjectClass } from 'realm';
import { DBAuctionLot } from './auctions/DBAuctionLot/DBAuctionLot';
import { DBAuctionSite } from './auctions/DBAuctionSite/DBAuctionSite';
import { DBFacility } from './auctions/DBFacility/DBFacility';
import { DBSelfStorage } from './auctions/DBSelfStorage/DBSelfStorage';
import { AddressObj } from './embedded/Address/AddressObj';
import { CostObj } from './embedded/Cost/CostObj';
import { FileLocationObj } from './embedded/FileLocation/FileLocationObj';
import { DBFileInfo } from './files/DBFileInfo/DBFileInfo';

// TODO Consolidate Model Files

export const $$schemaOC: ObjectClass[] = [AddressObj, CostObj, FileLocationObj, DBSelfStorage, DBFacility, DBAuctionLot, DBAuctionSite, DBFileInfo ];
console.log($$schemaOC);