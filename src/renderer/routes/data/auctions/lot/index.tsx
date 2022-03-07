import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { dt, routeNames } from '../../../constants';
import { FieldSetControl } from '../../../controls/FieldSetControl';
import { InputControl } from '../../../controls/InputControl';
import { InsertForm } from '../../../forms/InsertForm';
import { Grid } from '../../../Grid';
import { Facility, FacilityDTO, facilityInitial } from '../facility';
import { Output } from '../facility/Output';
import { RowID } from '../facility/RowID';
import { AuctionSite } from '../site';
import { asCurrency } from './asCurrency';

export type Cost = {
    depositAmount: number;
    bid: number;
    premiumPercent: number;
    salesTaxPercent: number;
    get total(): number;
    get premium(): number;
    get salesTax(): number;
};
export class CostDTO {
    static schema: Realm.ObjectSchema = {
        name: routeNames.embedded.cost,
        embedded: true,
        properties: {
            depositAmount: dt.double,
            bid: dt.double,
            premiumPercent: dt.double,
            salesTaxPercent: dt.double
        }
    };
    get premium(): number {
        const dto = this as any as Cost;
        return dto.premiumPercent * dto.bid;
    }
    get tax(): number {
        const dto = this as any as Cost;
        return dto.salesTaxPercent * dto.bid;
    }
    get total(): number {
        const dto = this as any as Cost;
        return dto.bid + dto.premium + dto.salesTax;
    }
    toLookup() {
        return this.total;
    }
}
export const costInitial = (): Cost => {
    const ret: Cost = new CostDTO() as any;
    ret.bid = 0;
    ret.depositAmount = 0;
    ret.premiumPercent = 0;
    ret.salesTaxPercent = 0;
    return ret;
};

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

export function toDateString(date: Date): string {
    const m = date.getMonth().toFixed(0).padStart(2, '0');
    const d = date.getDay().toFixed(0).padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/{y}`;
}
export type Lot = {
    _id: ObjectId;
    auctionID: string;
    auctionSite: AuctionSite;
    facility: Facility;
    closeDate: Date;
    cost: Cost;
    unit?: string;
    unitSize?: string;
    cleanout?: number;
    get name(): string;
};
export class LotDTO {
    static schema: ObjectSchema = {
        name: routeNames.auctions.lot,
        primaryKey: '_id',
        properties: {
            _id: dt.objectId,
            auctionID: dt.string,
            auctionSite: routeNames.auctions.auctionSite,
            facility: routeNames.auctions.facility,
            closeDate: dt.date,
            cost: routeNames.embedded.cost,
            unit: dt.opt.string,
            unitSize: dt.opt.string,
            cleanout: dt.opt.int
        }
    };
    toLookup(): string {
        return (this as any).name;
    }
    get name(): string {
        const dto = this as any as Lot;
        return `${toDateString(dto.closeDate)}: ${dto.facility.name}`;
    }
}
export const lotInitial = () => {
    const result = new LotDTO() as any as Lot;
    result._id = new ObjectId();
    result.auctionID = '';
    result.facility = facilityInitial();
    result.closeDate = new Date(Date.now());
    result.cost = costInitial();
    result.unit = '';
    result.unitSize = '';
    result.cleanout = 72;
    return result;
};

export function LotHeaders() {
    return (
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Auction Site</th>
            <th>AuctionID</th>
            <th>Facility</th>
            <th>Close Date</th>
            <th>Cost</th>
            <th>Unit Number</th>
            <th>Unit Size</th>
            <th>Cleanout Period</th>
            <th>Invoice</th>
        </tr>
    );
}
// TODO add Invoice
export function LotRow({ data, index, typeName }: { typeName: string; index: number; data: Realm.Object & Lot }) {
    return (
        <tr key={index} data-id={data._id.toHexString()}>
            <RowID data={data} />
            <td>{data.name}</td>
            <td>{data.auctionSite.name}</td>
            <td>{data.auctionID}</td>        
            <td>{data.facility.name}</td>
            <td>{toDateString(data.closeDate)}</td>
            <td>{data.cost.total}</td>
            <td>{data.unit}</td>
            <td>{data.unitSize}</td>
            <td>{data.cleanout}</td>
            <td></td>
        </tr>
    );
}

export function LotGrid({ realm }: { realm: Realm }) {
    return <Grid typeName={routeNames.auctions.lot} realm={realm} sort={[['name', false]]} GridHeaders={LotHeaders} TableRow={LotRow} />;
}
export function asPercentage(n: number) {
    return `${(n * 100).toFixed(2)}%`;
}
export function LotInsertForm({ realm }: { realm: Realm }) {
    return (
        <InsertForm realm={realm} type={routeNames.auctions.lot} initial={lotInitial}>
            <Output name='name' span={2} />
            <InputControl name='auctionID' inputType='text' required />
            <InputControl name='facility' inputType='url' required />
            <InputControl name='closeDate' inputType='date' required />
            <FieldSetControl name='cost'>
                <InputControl name='bid' inputType='number' required toOutput={asCurrency} placeholder='$150.00' />
                <Output name='total' /> 
                <InputControl name='premiumPercent' inputType='text' required toOutput={asPercentage} placeholder='5.00% enter as (0.05)' />
                <Output name='premium' /> 
                <InputControl name='salesTaxPercent' inputType='text' required toOutput={asPercentage} placeholder='7.75% enter as 0.0775' />
                <Output name='salesTax' />
                <InputControl name='depositAmount' inputType='text' required toOutput={asCurrency} placeholder='$100.00' /> 
            </FieldSetControl>
            <InputControl name='cost' inputType='url' />
            <InputControl name='unit' inputType='text' placeholder='#' />
            <InputControl name='unitSize' inputType='text' placeholder='5 x 5' />
            <InputControl name='cleanout' inputType='number' /> 
            
            unit: string; unitSize: string; cleanout: string; name: string;
        </InsertForm>
    );
}
