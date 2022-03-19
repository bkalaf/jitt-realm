import * as Realm from 'realm';
import { CountryISO2 } from '../../db/enums/CountryISO2';
import { Provinces } from '../../db/enums/Provinces';
import { $dto$address } from './$dto$address';
import { $dto$cost } from './$dto$cost';

// export type address = {
//     city?: string;
//     country: string;
//     postal?: string;
//     state: string;
//     street?: string;
//     suite?: string;
// };

export type auctionSite = {
    _id: Realm.BSON.ObjectId;
    name: string;
    owner: string;
    website?: string;
};



// export type cost = {
//     bid: number;
//     depositAmount: number;
//     premiumPercent: number;
//     salesTaxPercent: number;
// };

export type facility = {
    _id: Realm.BSON.ObjectId;
    address?: address;
    email?: string;
    facilityNumber?: string;
    owner: string;
    phoneNumber?: string;
    selfStorage?: selfStorage;
};



export type fileInfo = {
    _id: Realm.BSON.ObjectId;
    createDate: Date;
    data: ArrayBuffer;
    hash: string;
    ids: Record<string, string>;
    isUnassigned: boolean;
    itemType?: string;
    location?: fileLocation;
    mimeType: string;
    modifiedDate: Date;
    owner: string;
    size: number;
    type?: string;
};





export type lot = {
    _id: Realm.BSON.ObjectId;
    auctionID?: string;
    auctionSite?: auctionSite;
    cleanout?: number;
    closeDate: Date;
    cost?: cost;
    facility?: facility;
    invoice?: fileInfo;
    owner: string;
    size?: string;
    unit?: string;
    unitSize?: string;
};



export type selfStorage = {
    _id: Realm.BSON.ObjectId;
    name: string;
    owner: string;
    website?: string;
    facilities: facility[];
};



export const Schema = [$dto$address, $dto$cost, auctionSiteSchema, facilitySchema, fileSchema, fileLocationSchema, lotSchema, selfStorageSchema];
