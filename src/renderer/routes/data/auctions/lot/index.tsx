import {
    FieldSetControl,
    OutputControl,
    InputControl,
    SelectControl,
    $$datatypes,
    $$names,
    ObjectId,
    ObjectSchema,
    RowID
} from '@controls/index';
import { Results } from 'realm';
import { InsertForm } from '../../../forms/InsertForm';
import { Grid } from '../../../Grid';
import { Facility, facilityInitial } from '../facility';
import { AuctionSite } from '../site';
import { asCurrency, fromCurrency } from './asCurrency';
import { asPercentage, fromPercentage } from './asPercentage';
import { toDateString } from './toDateString';
import { toHexString } from './toHexString';

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
        name: $$names.embedded.cost,
        embedded: true,
        properties: {
            depositAmount: $$datatypes.double,
            bid: $$datatypes.double,
            premiumPercent: $$datatypes.double,
            salesTaxPercent: $$datatypes.double
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
    const cost: Cost = {} as any;
    cost.bid = 0;
    cost.depositAmount = 0;
    cost.premiumPercent = 0;
    cost.salesTaxPercent = 0;
    Object.defineProperties(cost, {
        total: {
            get: function (this: Cost) {
                return this.bid + this.premium + this.salesTax;
            }
        },
        salesTax: {
            get: function (this: Cost) {
                return this.salesTaxPercent * this.bid;
            }
        },
        premium: {
            get: function (this: Cost) {
                return this.premiumPercent * this.bid;
            }
        }
    });
    return cost;
};

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
        return `${toDateString(dto.closeDate)}: ${dto.facility?.name ?? ''}`;
    }
}
export const lotInitial = () => {
    const result: Lot = {} as any;
    result._id = new ObjectId();
    result.auctionID = '';
    result.closeDate = new Date(Date.now());
    result.cost = costInitial();
    result.unit = '';
    result.unitSize = '';
    result.cleanout = 72;
    Object.defineProperty(result, 'name', {
        get: function (this: Lot) {
            return `${toDateString(this.closeDate)}: ${this.facility?.name ?? ''}`;
        }
    });
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
            <td>{data.auctionSite?.name}</td>
            <td>{data.auctionID}</td>
            <td>{data.facility?.name}</td>
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
    return <Grid typeName={$$names.auctions.lot} realm={realm} sort={[['closeDate', true]]} GridHeaders={LotHeaders} TableRow={LotRow} />;
}
export function LotInsertForm({ realm }: { realm: Realm }) {
    return (
        <InsertForm realm={realm} type={$$names.auctions.lot} initial={lotInitial}>
            <OutputControl name='name' span={2} />
            <SelectControl name='auctionSite' lookup={$$names.auctions.auctionSite} toOutput={toHexString} />
            <InputControl name='auctionID' display='Auction ID' inputType='text' />
            <SelectControl name='facility' required lookup={$$names.auctions.facility} toOutput={toHexString} />
            <InputControl name='closeDate' inputType='text' required valueAs='date'/>
            <FieldSetControl name='cost'>
                <InputControl
                    name='bid'
                    inputType='text'
                    required
                    toOutput={asCurrency}
                    toDatabase={fromCurrency}
                    placeholder='$150.00'
                    valueAs='number'
                />
                <OutputControl name='total' />
                <InputControl
                    name='premiumPercent'
                    inputType='text'
                    required
                    toOutput={asPercentage}
                    toDatabase={fromPercentage}
                    placeholder='5.00% enter as (0.05)'
                    valueAs='number'
                />
                <OutputControl name='premium' />
                <InputControl
                    name='salesTaxPercent'
                    inputType='text'
                    required
                    toDatabase={fromPercentage}
                    toOutput={asPercentage}
                    placeholder='7.75% enter as 0.0775'
                    valueAs='number'
                />
                <OutputControl name='salesTax' />
                <InputControl
                    name='depositAmount'
                    inputType='text'
                    toOutput={asCurrency}
                    toDatabase={fromCurrency}
                    placeholder='$100.00'
                    valueAs='number'
                />
            </FieldSetControl>
            <InputControl name='unit' inputType='text' placeholder='#' />
            <InputControl name='unitSize' inputType='text' placeholder='5 x 5' />
            <InputControl name='cleanout' inputType='number' />
        </InsertForm>
    );
}
