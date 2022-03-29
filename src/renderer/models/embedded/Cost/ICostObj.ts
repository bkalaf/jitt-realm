export interface ICostObj {
    bid: number;
    depositAmount: number;
    premiumPercent: number;
    salesTaxPercent: number;
    taxExempt: boolean;
    readonly premiumAmount: number;
    readonly salesTaxAmount: number;
    readonly totalAmount: number;
}
