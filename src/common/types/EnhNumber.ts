import { replaceAll } from '../text/replaceAll';
import { IEnhNumber } from './IEnhNumber';

export type EnhNumberType = 'currency' | 'percentage' | 'integer' | 'float';

export class EnhNumber {
    #value = 0;
    #symb?: string;
    #decimals = 0;
    #padStartLength = 0;
    #padStartChar?: string;
    toCurrency(): string {
        return [this.#symb, this.toFixed(this.#decimals)].join('').padStart(this.#padStartLength, this.#padStartChar);
    }
    toPercentage(): string {
        return [(this.#value * 100).toFixed(this.#decimals).padStart(2, '0'), '%'].join('');
    }
    toOutput(): string {
        switch (this.kind) {
            case 'currency':
                return this.toCurrency();
            case 'percentage':
                return this.toPercentage();
            case 'integer':
                return this.toString();
            case 'float':
                return this.toString();
        }
    }
    kind: EnhNumberType;
    toString(radix?: number): string {
        return this.#value.toString(radix);
    }
    toFixed(fractionDigits?: number): string {
        return this.#value.toFixed(fractionDigits);
    }
    toExponential(fractionDigits?: number): string {
        return this.#value.toExponential(fractionDigits);
    }
    toPrecision(precision?: number): string {
        return this.#value.toPrecision(precision);
    }
    valueOf(): number {
        return this.#value.valueOf();
    }
    toLocaleString(locales?: string | string[], options?: Intl.NumberFormatOptions): string;
    toLocaleString(locales?: string | string[] | Intl.Locale | Intl.Locale[], options?: Intl.NumberFormatOptions): string;
    toLocaleString(locales?: string | string[] | Intl.Locale | Intl.Locale[], options?: Intl.NumberFormatOptions): string {
        return this.#value.toLocaleString(locales as any, options as any);
    }
    get val(): number {
        return this.#value;
    }
    constructor(v: number, kind: EnhNumberType, symb = '', decimals = 0) {
        this.kind = kind;
        this.#value = v;
        this.#symb = symb;
        this.#decimals = decimals;
    }
    static OfPercentage(v: number, decimals = 0): IEnhNumber {
        return new EnhNumber(v, 'percentage', '', decimals);
    }
    static OfCurrency(v: number, symb = '$', decimals = 0): IEnhNumber {
        return new EnhNumber(v, 'currency', symb, decimals);
    }
    public setPad(qty: number, ch = '0') {
        this.#padStartChar = ch;
        this.#padStartLength = qty;
        return this;
    }
    static ParsePercentage(value: string, decimals = 0) {
        return EnhNumber.OfPercentage(parseFloat(replaceAll('%', '')(value)) * 100, decimals);
    }
    static ParseCurrency(value: string, symb = '', decimals = 0) {
        return EnhNumber.OfCurrency(parseFloat(replaceAll('$', '')(value)), symb, decimals);
    }
    static ParseInteger(value: string): IEnhNumber {
        return new EnhNumber(parseInt(value, 10), 'integer');
    }
    static Parse(value: string, kind?: EnhNumberType, symb = '$', dec = 2) {
        switch (kind != null ? kind : value.includes('$') ? 'currency' : value.includes('%') ? 'percentage' : value.includes('.') ? 'float' : 'integer') {
            case 'currency':
                return EnhNumber.ParseCurrency(value, symb, dec);
            case 'integer':
                return EnhNumber.ParseInteger(value);
            case 'percentage':
                return EnhNumber.ParsePercentage(value, dec);
            case 'float':
                return new EnhNumber(parseFloat(value), 'float');
        }
    }
    public parse(value: string, currencySymbol = '', decimals = 2) {
        return EnhNumber.Parse(value, this.kind, this.#symb, this.#decimals);
    }
}
