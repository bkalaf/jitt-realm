import { IEnhNumber } from '../../../../common/types/IEnhNumber';

/*
 * File generated by Interface generator (dotup.dotup-vscode-interface-generator)
 * Date: 2022-03-19 04:45:00 
*/
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
