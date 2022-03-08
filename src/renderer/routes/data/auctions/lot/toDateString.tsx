// export type Lot = {
//     _id: ObjectId;
//     facility: Facility;
//     auctionSite: AuctionSite;
//     auctionID?: string;
//     size?: string;
//     unitNumber?: string;
//     cleanoutTime?: number;
//     cost?: Cost;
// }
// export class LotDTO {
//     static schema: ObjectSchema = {
//         name: routeNames.auctions.lot,
//         primaryKey: '_id',
//         properties: {
//             _id: dt.objectId,
//             auctionID: dt.opt.string,
//             size: dt.opt.string,
//             auctionSite: routeNames.auctions.auctionSite,
//             cost: routeNames.embedded.cost
//         }
//     }
// }

import { faEggFried } from '@fortawesome/pro-solid-svg-icons';
import { Result } from '../../../../hooks/$useControl';
import { wrapTry } from './wrapTry';

export function stringifyDate(date: Date): string {
    const m = date.getMonth().toFixed(0).padStart(2, '0');
    const d = date.getDay().toFixed(0).padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
}
export function parseDate(date: string) {
    return new Date(Date.parse(date));
}

export function tryToDateString(date: Date) {
    try {
        const result = stringifyDate(date);
        return Result.toPass(result);
    } catch (error) {
        return Result.toFail((error as Error).message);
    }
}
export const tryParseDate = wrapTry(parseDate);
export const tryStringifyDate = wrapTry(stringifyDate);
