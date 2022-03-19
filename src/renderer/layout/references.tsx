/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { SortDescriptor } from 'realm';
import { identity } from '../../common/identity';
import { CountryISO2, countryMap } from '../db/enums/CountryISO2';
import { provinceMap } from '../db/enums/Provinces';
import { $$names, FieldSetControl, InputControl, OutputControl, RowHeadCell, SelectControl, TextInputControl, TextOutputControl } from '../routes/controls/index';
import { facilityConvertIn } from '../routes/data/auctions/facility/index';
import { SelfStorageHeaders } from '../routes/data/auctions/selfStorage/SelfStorageHeaders';
import { selfStorageConvertIn, selfStorageInitial } from '../routes/data/auctions/selfStorage/SelfStorageInsertForm';
import { SelfStorageRow } from '../routes/data/auctions/selfStorage/SelfStorageRow';
import { addressConvertIn } from "../routes/embedded/addressConvertIn";
import { addressInitial } from "../routes/embedded/addressInitial";
import { FacilityHeader } from '../routes/data/auctions/facility/FacilityHeader';
import { FacilityRow } from '../routes/data/auctions/facility/FacilityRow';
import { DTO } from '../routes/providers/InsertFormCtxt';
import { ObjectId } from 'bson';
import { lookupObject } from '../routes/data/auctions/facility/lookupObject';
import { AuctionSiteHeaders, auctionSiteInitial, AuctionSiteRow } from '../routes/data/auctions/site';
import { Lot } from '../routes/data/auctions/lot';
import { stringifyDate } from '../util/toDateString';
import { File$, FileDTO } from '../routes/data/files/fileInfo';
import { lotConvertTo } from '../routes/data/auctions/lot/lotConvertTo';
import { lotInitial } from '../routes/data/auctions/lot/lotInitial';
import { useEffect, useRef } from 'react';
import { deepCopy } from '../routes/forms/deepCopy';
import { $countries } from '../hooks/useProvideDataLists';
import { Brand } from '../routes/data/products/brand';

export type BrandProxy = {
    _id: string;
    name: string;
    country: CountryISO2;
    aliases: string[];
    parent?: BrandProxy;
    childs: BrandProxy[];
};
export const $reference: Record<string, { initial: (realm?: Realm | undefined) => any; convertTo: (x: any, realm?: Realm) => any; children: JSX.Element[] }> = {
    [$$names.products.brands]: {
        initial: (realm?: Realm) => {
            const dto = {} as BrandProxy;
            dto._id = new ObjectId().toHexString();
            dto.name = '';
            dto.country = 'US';
            dto.aliases = [];
            dto.childs = [];
            dto.parent = undefined;
            return dto;
        },
        convertTo: (obj: any, realm: Realm) => {
            const result = deepCopy(obj);
            result._id = new ObjectId(obj._id);
            result.parent = lookupObject(realm, $$names.products.brands)(obj.parent);
            result.childs = obj.childs.map((x: any) => lookupObject(realm, $$names.products.brands)(x));
            return result;
        },
        children: [
            <InputControl key={1} name='name' displayName='Name' />,
            <SelectControl key={2} name='parent' display='Parent' optionLabel={(x) => x.name} lookup={$$names.products.brands} />,
            <InputControl key={3} name='country' displayName='Country' list={$countries} />
        ]
    },
    [$$names.embedded.address]: {
        initial: addressInitial,
        convertTo: addressConvertIn,
        children: [
            <InputControl key={0} name='street' type='text' autoComplete='street' />,
            <InputControl key={1} name='suite' type='text' />,
            <InputControl key={2} name='city' type='text' autoComplete='city' />,
            <SelectControl key={3} name='state' lookup={provinceMap} autoComplete='state' />,
            <SelectControl key={4} name='country' lookup={countryMap} autoComplete='country' />,
            <InputControl key={5} name='postal' type='text' autoComplete='postalCode' />
        ]
    },
    [$$names.auctions.selfStorage]: {
        initial: selfStorageInitial,
        convertTo: selfStorageConvertIn,
        children: [<TextInputControl key={1} type='text' name='name' required />, <TextInputControl key={2} type='url' name='website' />]
    },
    [$$names.auctions.facility]: {
        initial: ((realm: Realm) => {
            const facility = {} as any;
            facility._id = new ObjectId().toHexString();
            facility.phoneNumber = '';
            facility.email = '';
            facility.address = JITTRegistrar.getInitial($$names.embedded.address)();
            facility.facilityNumber = '';
            Object.defineProperty(facility, 'name', {
                get: function (this: any) {
                    return `${lookupObject<{ name: string }>(realm, 'self-storage')(this.selfStorage)?.name ?? ''} - ${this.address?.city ?? ''}, ${this.address?.state ?? ''} - ${
                        this.address?.street?.split(' ')?.slice(1).join(' ') ?? ''
                    }`;
                }
            });
            return facility;
        }) as any,
        convertTo: facilityConvertIn,
        children: [
            <OutputControl key={1} name='name' span={2} stringify={identity} parse={identity} />,
            <InputControl key={2} name='facilityNumber' type='text' stringify={identity} parse={identity} />,
            <SelectControl key={3} name='selfStorage' lookup={$$names.auctions.selfStorage} optionLabel={(x) => x.name} />,
            <InputControl key={4} name='phoneNumber' type='tel' placeholder='(619) 555-1212' autoComplete='tel' />,
            <InputControl key={5} name='email' type='email' placeholder='john.doe@example.com' />,
            <FieldSetControl key={6} name='address' />
        ]
    },
    [$$names.auctions.auctionSite]: {
        initial: auctionSiteInitial,
        convertTo: function (obj: any, realm: Realm) {
            const dto = {} as any;
            dto._id = new ObjectId(obj._id);
            dto.name = obj.name;
            dto.website = obj.website;
            dto.lots = obj.lots.map((x: string) => lookupObject(realm, $$names.auctions.lot)(x));
            return dto;
        } as any,
        children: [<TextInputControl key={1} name='name' type='text' required />, <TextInputControl key={2} name='website' type='url' />]
    },
    [$$names.auctions.lot]: {
        initial: lotInitial,
        convertTo: lotConvertTo,
        children: [
            <OutputControl key={1} name='name' span={2} />,
            <SelectControl key={2} name='auctionSite' display='Auction Site' lookup={$$names.auctions.auctionSite} optionLabel={(x) => x.name} />,
            <InputControl key={3} name='auctionID' displayName='Auction ID' type='text' />,
            <SelectControl key={4} name='facility' required lookup={$$names.auctions.facility} optionLabel={(x) => x.name} />,
            <InputControl key={5} name='closeDate' type='text' required />,
            <FieldSetControl key={6} name='cost' />,
            <InputControl key={7} name='unit' type='text' placeholder='#' />,
            <InputControl key={8} name='unitSize' displayName='Unit Size' type='text' placeholder='5 x 5' />,
            <InputControl key={9} name='cleanout' type='text' placeholder='#' />,
            <SelectControl key={10} name='invoice' lookup={$$names.files.file} filtered='isUnassigned == true' optionLabel={(x: File$) => x.location.filename} />
        ]
    }
} as any;

console.log($reference);
export type TableRowFunction = <T extends DTO>(props: { data: Realm.Object & T; index: number; typeName: string }) => JSX.Element;

const c = Object.entries(provinceMap);

const pc = new RegExp("^[0-9]{5}(-?[0-9]{4})?$|^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][ -]?[0-9][ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9]$");
console.log(pc.test('92111'));
console.log(pc.test('921111234'));
console.log(pc.test('92111-1234'));
console.log(pc.test('92111-1'));
console.log(pc.test('92111 1234'));
console.log(pc.test('0912'));
console.log(pc.test('A1A1A1'));
console.log(pc.test('A1A 1A1'));
console.log(pc.test('A101A1'));
console.log(pc.test('A1A-1A1'));
console.log(pc.test('Z1A1A1'));

export const $grid: Record<
    string,
    {
        GridHeaders: () => JSX.Element;
        sort: SortDescriptor[];
        TableRow: TableRowFunction;
    }
> = {
    [$$names.products.brands]: {
        GridHeaders: () => (
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Aliases</th>
                <th>Owner</th>
                <th>Subsidiarys</th>
            </tr>
        ),
        TableRow: function <T extends Brand>({ data, index }: { data: Realm.Object & T; index: number }) {
            return (
                <tr>
                    <RowHeadCell data={data} />
                    <td>{data.name}</td>
                    <td>{data.country}</td>
                    <td>{data.aliases}</td>
                    <td>{data.parent?.name}</td>
                    <td>
                        <ul>
                            {data.childs.map((x, ix) => (
                                <li key={ix}>{x.name}</li>
                            ))}
                        </ul>
                    </td>
                </tr>
            );
        }
    },
    [$$names.auctions.selfStorage]: {
        GridHeaders: SelfStorageHeaders,
        TableRow: SelfStorageRow as TableRowFunction,
        sort: [['name', false]] as SortDescriptor[]
    },
    [$$names.auctions.facility]: {
        GridHeaders: FacilityHeader,
        TableRow: FacilityRow as TableRowFunction,
        sort: [
            ['selfStorage.name', false],
            ['address.state', false],
            ['address.city', false]
        ] as SortDescriptor[]
    },
    [$$names.auctions.auctionSite]: {
        GridHeaders: AuctionSiteHeaders,
        TableRow: AuctionSiteRow as TableRowFunction,
        sort: [['name', false]] as SortDescriptor[]
    },
    [$$names.auctions.lot]: {
        GridHeaders: function LotHeaders() {
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
        },
        TableRow: function LotRow({ data, index, typeName }: { typeName: string; index: number; data: Realm.Object & Lot }) {
            const pdf = useRef<string | null>(null);
            useEffect(() => {
                if (data.invoice == null || data.invoice.data == null) throw new Error('bad buffer');
                const blob = new Blob([new Uint8Array(data.invoice.data)], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                pdf.current = url;
                return () => {
                    URL.revokeObjectURL(pdf.current ?? '');
                    pdf.current = null;
                };
            });
            return (
                <tr key={index} data-id={data._id.toHexString()}>
                    <RowHeadCell scope='col' data={data} />
                    <td>{data.name}</td>
                    <td>{data.auctionSite?.name}</td>
                    <td>{data.auctionID}</td>
                    <td>{data.facility?.name}</td>
                    <td>{stringifyDate(data.closeDate)}</td>
                    <td>{data.cost.total}</td>
                    <td>{data.unit}</td>
                    <td>{data.unitSize}</td>
                    <td>{data.cleanout}</td>
                    <td>{data.invoice?.toUri}</td>
                    <td>{pdf.current != null && <iframe title={data.name} width='10%' height='10%' src={pdf.current} />}</td>
                </tr>
            );
        } as any,
        sort: [
            ['closeDate', false],
            ['facility.selfStorage.name', false]
        ] as SortDescriptor[]
    }
} as any;
