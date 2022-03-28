import { caps } from '../../../common/text/caps';

export { ILinkingObjects } from '../../../common/types/ILinkingObjects';
export { ObjectId, UUID } from 'bson';
export { ObjectSchema } from 'realm';
export { EnhNumber } from '../../../common/types/EnhNumber';
export { IEnhNumber } from '../../../common/types/IEnhNumber';

export const ADDRESS = 'address';
export const COST = 'cost';
export const FILE_LOCATION = 'file-location';

export const SELF_STORAGE = 'self-storage';
export const FACILITY = 'facility';
export const AUCTION_SITE = 'auction-site';
export const AUCTION_LOT = 'auction-lot';
export const FILE_INFO = 'file-info';

export type ADDRESS = typeof ADDRESS;
export type COST = typeof COST;
export type FILE_LOCATION = typeof FILE_LOCATION;

export type SELF_STORAGE = typeof SELF_STORAGE;
export type FACILITY = typeof FACILITY;
export type AUCTION_SITE = typeof AUCTION_SITE;
export type AUCTION_LOT = typeof AUCTION_LOT;
export type FILE_INFO = typeof FILE_INFO;

export const ROUTES = {
    $: {
        ADDRESS: ADDRESS,
        COST: COST,
        FILE_LOCATION: FILE_LOCATION
    },
    AUCTIONS: {
        SELF_STORAGE: SELF_STORAGE,
        FACILITY: FACILITY,
        AUCTION_SITE: AUCTION_SITE,
        AUCTION_LOT: AUCTION_LOT
    },
    FILES: {
        FILE_INFO: FILE_INFO
    }
};

export function $toPropName(str: string): string {
    const [head, ...tail] = str.split('-');
    return [head, tail.map(caps)].join('');
}