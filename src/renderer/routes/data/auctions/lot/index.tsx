import { Cost } from '../../../embedded/cost';
import { Facility } from '../facility/Facility';
import { AuctionSite } from '../site/index';
import { stringifyDate } from '../../../../util/toDateString';
import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { $$names, $$datatypes } from '../../../controls/index';

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
            cleanout: $$datatypes.opt.int
        }
    };
    toLookup(): string {
        return (this as any).name;
    }
    get name(): string {
        const dto = this as any as Lot;
        return `${stringifyDate(dto.closeDate)}: ${dto.facility?.name ?? ''}`;
    }
}
// export const lotInitial = () => {
//     const result: Lot = {} as any;
//     result._id = new ObjectId();
//     result.auctionID = '';
//     result.closeDate = new Date(Date.now());
//     result.cost = costInitial();
//     result.unit = '';
//     result.unitSize = '';
//     result.cleanout = 72;
//     Object.defineProperty(result, 'name', {
//         get: function (this: Lot) {
//             return `${stringifyDate(this.closeDate)}: ${this.facility?.name ?? ''}`;
//         }
//     });
//     return result;
// };

// export function LotHeaders() {
//     return (
//         <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Auction Site</th>
//             <th>AuctionID</th>
//             <th>Facility</th>
//             <th>Close Date</th>
//             <th>Cost</th>
//             <th>Unit Number</th>
//             <th>Unit Size</th>
//             <th>Cleanout Period</th>
//             <th>Invoice</th>
//         </tr>
//     );
// }
// // TODO add Invoice
// export function LotRow({ data, index, typeName }: { typeName: string; index: number; data: Realm.Object & Lot }) {
//     return (
//         <tr key={index} data-id={data._id.toHexString()}>
//             <RowHeadCell scope='col' data={data} />
//             <td>{data.name}</td>
//             <td>{data.auctionSite?.name}</td>
//             <td>{data.auctionID}</td>
//             <td>{data.facility?.name}</td>
//             <td>{stringifyDate(data.closeDate)}</td>
//             <td>{data.cost.total}</td>
//             <td>{data.unit}</td>
//             <td>{data.unitSize}</td>
//             <td>{data.cleanout}</td>
//             <td></td>
//         </tr>
//     );
// }

// export function LotGrid({ realm }: { realm: Realm }) {
//     return <Grid typeName={$$names.auctions.lot} realm={realm} sort={[['closeDate', true]]} GridHeaders={LotHeaders} TableRow={LotRow} />;
// }

// export function LotInsertForm({ realm, type }: { realm: Realm; type: string }) {
//     return (
//         <InsertForm realm={realm} type={type} initial={lotInitial}>
//             <TextOutputControl name='name' span={2} />
//             <LookupControl name='auctionSite' display='Auction Site' lookup={$$names.auctions.auctionSite} />
//             <TextInputControl name='auctionID' display='Auction ID' type='text' />
//             <LookupControl name='facility' required lookup={$$names.auctions.facility} />
//             <TextInputControl name='closeDate' type='text' required />
//             {/* <FieldSetControl name='cost'>
//                 <TextInputControl name='bid' type='text' required placeholder='$150.00' />
//                 <TextOutputControl name='total' span={1} />
//                 <TextInputControl name='premiumPercent' type='text' required placeholder='5.00% enter as (0.05)' />
//                 <TextOutputControl name='premium' type='text' span={1} />
//                 <TextInputControl name='salesTaxPercent' type='text' required placeholder='7.75% enter as 0.0775' />
//                 <TextOutputControl name='salesTax' type='text' span={1} />
//                 <TextInputControl name='depositAmount' type='text' placeholder='$100.00' />
//             </FieldSetControl> */}
//             <TextInputControl name='unit' type='text' placeholder='#' />
//             <TextInputControl name='unitSize' display='' type='text' placeholder='5 x 5' />
//             <TextInputControl name='cleanout' type='text' placeholder='#' />
//             <TextInputControl name='unit' type='text' placeholder='#' />
//             <TextInputControl name='unitSize' type='text' placeholder='5 x 5' />
//             <TextInputControl name='cleanout' type='number' />
//         </InsertForm>
//     );
// }
