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

export const auctionSiteSchema = {
    name: 'auction-site',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
        website: 'string?'
    }
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

export const facilitySchema = {
    name: 'facility',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        address: 'address',
        email: 'string?',
        facilityNumber: 'string?',
        phoneNumber: 'string?',
        selfStorage: 'self-storage'
    }
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

export const fileSchema = {
    name: 'file',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        createDate: 'date',
        data: 'data',
        hash: 'string',
        ids: 'string{}',
        isUnassigned: 'bool',
        itemType: 'string?',
        location: 'file-location',
        mimeType: 'string',
        modifiedDate: 'date',
        size: 'int',
        type: 'string?'
    }
};

export type fileLocation = {
    drive?: string;
    filename: string;
    folder: string;
};

export const fileLocationSchema = {
    name: 'file-location',
    embedded: true,
    properties: {
        drive: 'string?',
        filename: 'string',
        folder: 'string'
    }
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

export const lotSchema = {
    name: 'lot',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        auctionID: 'string?',
        auctionSite: 'auction-site',
        cleanout: 'int?',
        closeDate: 'date',
        cost: 'cost',
        facility: 'facility',
        invoice: 'file',
        size: 'string?',
        unit: 'string?',
        unitSize: 'string?'
    }
};

export type selfStorage = {
    _id: Realm.BSON.ObjectId;
    name: string;
    owner: string;
    website?: string;
    facilities: facility[];
};

export const selfStorageSchema = {
    name: 'self-storage',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
        website: 'string?',
        facilities: {
            type: 'linkingObjects',
            objectType: 'facility',
            property: 'selfStorage'
        }
    }
};

export const Schema = [$dto$address, $dto$cost, auctionSiteSchema, facilitySchema, fileSchema, fileLocationSchema, lotSchema, selfStorageSchema];
