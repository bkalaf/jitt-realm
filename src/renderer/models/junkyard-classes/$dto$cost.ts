import { EnhNumber } from '../../../common/types/EnhNumber';
import { IEnhNumber } from '../../../common/types/IEnhNumber';
import { I$dto$cost } from './I$dto$cost';

export const costSchema = {
    name: 'cost',
    embedded: true,
    properties: {
        bid: 'double',
        depositAmount: 'double',
        premiumPercent: 'double',
        salesTaxPercent: 'double',
        taxExempt: 'bool'
    }
};

// export function convertToCurrency(num: number): number {
//     return parseFloat(num.toFixed(2));
// }

export class $dto$cost implements I$dto$cost {
    static schema = costSchema;
    public bid: IEnhNumber;
    public depositAmount: IEnhNumber;
    public premiumPercent: IEnhNumber;
    public salesTaxPercent: IEnhNumber;
    public taxExempt: boolean;
    constructor() {
        this.bid = EnhNumber.OfCurrency(0.0);
        this.depositAmount = EnhNumber.OfCurrency(0.0);
        this.premiumPercent = EnhNumber.OfPercentage(0.0);
        this.salesTaxPercent = EnhNumber.OfPercentage(0.0);
        this.taxExempt = false;
    }
    public get premiumAmount(): IEnhNumber {
        return EnhNumber.OfCurrency(this.premiumPercent.val * this.bid.val, '$', 2);
    }
    public get salesTaxAmount(): IEnhNumber {
        return EnhNumber.OfCurrency(this.salesTaxPercent.val * this.bid.val, '$', 2);
    }
    public get totalAmount(): IEnhNumber {
        return EnhNumber.OfCurrency(this.bid.val + this.salesTaxAmount.val + this.premiumAmount.val, '$', 2);
    }
}
