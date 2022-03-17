/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Cost } from '../../../embedded/cost';
import { Facility } from '../facility/Facility';
import { AuctionSite } from '../site/index';
import { stringifyDate } from '../../../../util/toDateString';
import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { $$names, $$datatypes } from '../../../controls/index';
import { toDate } from '../../../../layout/toDate';
import { File$ } from '../../files/fileInfo';

// export const costInitial = (): Cost => {
//     const cost: Cost = {} as any;
//     cost.bid = 0;
//     cost.depositAmount = 0;
//     cost.premiumPercent = 0;
//     cost.salesTaxPercent = 0;
//     Object.defineProperties(cost, {
//         total: {
//             get: function (this: Cost) {
//                 return this.bid + this.premium + this.salesTax;
//             }
//         },
//         salesTax: {
//             get: function (this: Cost) {
//                 return this.salesTaxPercent * this.bid;
//             }
//         },
//         premium: {
//             get: function (this: Cost) {
//                 return this.premiumPercent * this.bid;
//             }
//         }
//     });
//     return cost;
// };

export type Lot = {
    _id: ObjectId;
    auctionID: string;
    auctionSite?: AuctionSite;
    facility?: Facility;
    closeDate: Date;
    cost: Cost;
    unit?: string;
    unitSize?: string;
    cleanout?: number;
    invoice?: File$;
    get name(): string;
};
export class LotDTO {
    static schema: ObjectSchema = {
        name: $$names.auctions.lot,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            auctionID: $$datatypes.opt.string,
            auctionSite: $$names.auctions.auctionSite,
            facility: $$names.auctions.facility,
            closeDate: $$datatypes.date,
            cost: $$names.embedded.cost,
            unit: $$datatypes.opt.string,
            unitSize: $$datatypes.opt.string,
            cleanout: $$datatypes.opt.int,
            invoice: $$names.files.file
        }
    };
    toLookup(): string {
        return (this as any).name;
    }
    get name(): string {
        const dto = this as any as Lot;
        return `${typeof dto.closeDate === 'string' ? dto.closeDate : toDate(dto.closeDate)}: ${dto.facility?.name ?? ''}`;
    }
}
