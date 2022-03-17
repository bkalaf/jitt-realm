import { SortDescriptor } from 'realm';
import { countryMap } from '../../../../db/enums/CountryISO2';
import { provinceMap } from '../../../../db/enums/Provinces';
import { TableRowFunction } from '../../../../layout/references';
import { InputControl, OutputControl, SelectControl, TextInputControl, TextOutputControl } from '../../../controls';
import { addressConvertIn, addressInitial } from '../../../embedded/address';
import { Cost, costConvertTo, costInitial } from '../../../embedded/cost';
import { fileLocationConvertIn, FileLocationHeaders, fileLocationInitial, FileLocationRow } from '../../files/fileInfo/fileLocation';

export class Registrar {
    static map = new Map();
    static addInsert(name: any, initial: any, convertTo: any, children: any, GridHeaders: any, TableRow: any, sort: any) {
        Registrar.map.set(name, [
            { initial, convertTo, children },
            { GridHeaders, TableRow, sort }
        ]);
    }
    static gett(name: any): any {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`attempting: ${name ?? ''}`, name);
        const result = Registrar.map.get(name);
        console.log(`result: `, result);
        return Registrar.map.get(name);
    }
    static getInitial(name: any) {
        return Registrar.gett(name)[0].initial;
    }
    static getConvert(name: any) {
        return Registrar.gett(name)[0].convertTo;
    }
    static getChildren(name: any) {
        return Registrar.gett(name)[0].children;
    }
    static getInsertProps(name: any) {
        return Registrar.gett(name)[0];
    }
    static getGridProps(name: any) {
        return Registrar.gett(name)[1];
    }
}

(global as any).JITTRegistrar = Registrar;
JITTRegistrar.addInsert(
    'address',
    addressInitial,
    addressConvertIn,
    [
        <InputControl key={0} name='street' type='text' autoComplete='street' />,
        <InputControl key={1} name='suite' type='text' />,
        <InputControl key={2} name='city' type='text' autoComplete='city' />,
        <SelectControl key={3} name='state' lookup={provinceMap} autoComplete='state' />,
        <SelectControl key={4} name='country' lookup={countryMap} autoComplete='country' />,
        <InputControl key={5} name='postal' type='text' autoComplete='postalCode' />
    ],
    () => <></>,
    () => <></>,
    []
);
JITTRegistrar.addInsert(
    'file-location',
    fileLocationInitial,
    fileLocationConvertIn,
    [<TextInputControl key={1} name='drive' />, <TextInputControl key={2} name='folder' />, <TextInputControl key={3} name='filename' />, <OutputControl key={4} name='extension' span={1} />],
    FileLocationHeaders,
    FileLocationRow as any,
    [
        ['drive', false],
        ['folder', false],
        ['filename', false]
    ] as SortDescriptor[]
);

export function toCurrency(n: number) {
    return `${(n ?? 0).toFixed(2).padStart(1, '0')}`;
}
export function toPercent(n: number) {
    return `${(n * 100).toFixed(2).padStart(1, '0')}%`;
}
JITTRegistrar.addInsert(
    'cost',
    costInitial,
    costConvertTo,
    [
        <InputControl key={0} name='bid' type='text' required placeholder='$150.00' />,
        <InputControl key={1} name='depositAmount' type='text' placeholder='$100.00' />,
        <InputControl key={2} name='premiumPercent' type='text' required placeholder='5.00% enter as (0.05)' />,
        <OutputControl key={3} name='premium' type='text' span={1} />,
        <InputControl key={4} name='salesTaxPercent' type='text' required placeholder='7.75% enter as 0.0775' />,
        <OutputControl key={5} name='tax' type='text' span={1} />,
        <OutputControl key={6} name='total' span={1} />
    ],
    () => (
        <tr>
            <th>Bid $</th>
            <th>Deposit Amount $</th>
            <th>Premium %</th>
            <th>Premium $</th>
            <th>Sales Tax %</th>
            <th>Sales Tax $</th>
            <th>Total $</th>
        </tr>
    ),
    (({ data }: { data: Realm.Object & Cost; index: number; typeName: string }) => (
        <>
            <td>{toCurrency(data.bid)}</td>
            <td>{toCurrency(data.depositAmount)}</td>
            <td>{toPercent(data.premiumPercent)}</td>
            <td>{toCurrency(data.premium)}</td>
            <td>{toPercent(data.salesTaxPercent)}</td>
            <td>{toCurrency(data.tax)}</td>
            <td>{toCurrency(data.total)}</td>
        </>
    )) as any,
    [['total', false]] as SortDescriptor[]
);
// (global as any).JITTRegistrar = Registrar;
