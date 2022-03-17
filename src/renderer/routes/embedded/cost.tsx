import { $$names, $$datatypes } from '../controls/index';

export type Cost = {
    depositAmount: number;
    bid: number;
    premiumPercent: number;
    salesTaxPercent: number;
    get total(): number;
    get premium(): number;
    get tax(): number;
};

const premiumFunc = function (this: any) {
    return parseFloat(this.premiumPercent ?? '0') * parseFloat(this.bid ?? '0');
};
const taxFunc = function (this: any) {
    return parseFloat(this.salesTaxPercent ?? '0') * parseFloat(this.bid ?? '0');
};
const totalFunc = function (this: any) {
    return parseFloat(this.bid ?? '0') + parseFloat(this.premium ?? '0') + parseFloat(this.tax ?? '0');
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
        return premiumFunc.bind(this)();
    }
    get tax(): number {
        return taxFunc.bind(this)();
    }
    get total(): number {
        return totalFunc.bind(this)();
    }
    toLookup() {
        return this.total;
    }
}

export const costInitial = (): Cost => {
    const cost: Cost = {} as any as Cost;
    cost.bid = 0;
    cost.depositAmount = 0;
    cost.premiumPercent = 0;
    cost.salesTaxPercent = 0;
    Object.defineProperties(cost, {
        premium: {
            get: premiumFunc
        },
        total: {
            get: totalFunc
        },
        tax: {
            get: taxFunc
        }
    });
    return cost;
};
export const costConvertTo = (obj: any) => {
    const dto = costInitial();
    dto.bid = parseFloat(obj.bid);
    dto.depositAmount = parseFloat(obj.depositAmount);
    dto.premiumPercent = parseFloat(obj.premiumPercent);
    dto.salesTaxPercent = parseFloat(obj.salesTaxPercent);
    return dto;
}