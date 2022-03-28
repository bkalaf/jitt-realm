import { ObjectSchema, ROUTES } from '../../junkyard-classes';

const schema = {
    name: ROUTES.$.COST,
    embedded: true,
    properties: {
        bid: { type: 'double', default: 0.0 },
        depositAmount: { type: 'double', default: 0.0 },
        premiumPercent: { type: 'double', default: 0.0 },
        salesTaxPercent: { type: 'double', default: 0.0 },
        taxExempt: { type: 'bool', default: false }
    }
};

// DTO db.$.cost
export class CostObj  {
    static schema: ObjectSchema = schema;
    public bid: number;
    public depositAmount: number;
    public premiumPercent: number;
    public salesTaxPercent: number;
    public taxExempt: boolean;
    constructor() {
        this.bid = 0.0;
        this.depositAmount = 0.0;
        this.premiumPercent = 0.0;
        this.salesTaxPercent = 0.0;
        this.taxExempt = false;
    }
    public get premiumAmount(): number {
        return this.premiumPercent * this.bid;
    }
    public get salesTaxAmount(): number {
        return this.salesTaxPercent * this.bid;
    }
    public get totalAmount(): number {
        return this.bid + (this.taxExempt ? 0.0 : this.salesTaxAmount) + this.premiumAmount;
    }
}
