import { EnhNumberType } from './EnhNumber';

export interface IEnhNumber {
    kind: EnhNumberType;
    // toCurrency(): string;
    // toPercentage(): string;
    toOutput(): string;
    setPad(qty: number, ch?: string): this;
    parse(value: string, currencySymbol?: string, decimals?: number): this;
    readonly val: number;
} 
export type IEnhNumber2 = IEnhNumber & number;
