import { $$names, $$datatypes } from '../controls/index';

export type Cost = {
    depositAmount: number;
    bid: number;
    premiumPercent: number;
    salesTaxPercent: number;
    get total(): number;
    get premium(): number;
    get salesTax(): number;
};

const premiumFunc = function (this: any) {
    const dto = this as Cost;
    return dto.premiumPercent * dto.bid;
};
const taxFunc = function (this: any) {
    const dto = this as Cost;
    return dto.salesTaxPercent * dto.bid;
};
const totalFunc = function (this: any) {
    const dto = this as Cost;
    return dto.bid + dto.premium + dto.salesTax;
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

// export const costInitial = (): Cost => {
//     const cost: Cost = new CostDTO() as any;
//     cost.bid = 0;
//     cost.depositAmount = 0;
//     cost.premiumPercent = 0;
//     cost.salesTaxPercent = 0;
//     Object.defineProperties(cost, {
//         premium: {
//             get: premiumFunc
//         },
//         total: {
//             get: totalFunc
//         },
//         tax: {
//             get: taxFunc
//         }
//     });
//     return cost;
// };
