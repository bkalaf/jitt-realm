/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { SortDescriptor } from 'realm';
import { identity } from '../../common/identity';
import { countryMap } from '../db/enums/CountryISO2';
import { provinceMap } from '../db/enums/Provinces';
import { $$names, FieldSetControl, InputControl, OutputControl, RowHeadCell, SelectControl, TextInputControl, TextOutputControl } from '../routes/controls/index';
import { facilityConvertIn } from '../routes/data/auctions/facility/index';
import { SelfStorageHeaders } from '../routes/data/auctions/selfStorage/SelfStorageHeaders';
import { selfStorageConvertIn, selfStorageInitial } from '../routes/data/auctions/selfStorage/SelfStorageInsertForm';
import { SelfStorageRow } from '../routes/data/auctions/selfStorage/SelfStorageRow';
import { addressConvertIn, addressInitial } from '../routes/embedded/address';
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

export const $reference: Record<string, { initial: (realm?: Realm | undefined) => any; convertTo: (x: any, realm?: Realm) => any; children: JSX.Element[] }> = {
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
};

console.log($reference);
export type TableRowFunction = <T extends DTO>(props: { data: Realm.Object & T; index: number; typeName: string }) => JSX.Element;
export const $grid: Record<
    string,
    {
        GridHeaders: () => JSX.Element;
        sort: SortDescriptor[];
        TableRow: TableRowFunction;
    }
> = {
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
};
