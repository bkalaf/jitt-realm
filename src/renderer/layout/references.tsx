/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { SortDescriptor } from 'realm';
import { identity } from '../../common/identity';
import { ignore } from '../../common/ignore';
import { countryMap } from '../db/enums/CountryISO2';
import { provinceMap } from '../db/enums/Provinces';
import { $$names, FieldSetControl, InputControl, OutputControl, SelectControl, TextInputControl } from '../routes/controls/index';
import { facilityConvertIn, facilityInitial, parseTel } from '../routes/data/auctions/facility/index';
import { formatTel } from '../routes/data/auctions/facility/formatTel';
import { SelfStorageHeaders } from '../routes/data/auctions/selfStorage/SelfStorageHeaders';
import { selfStorageConvertIn, selfStorageInitial } from '../routes/data/auctions/selfStorage/SelfStorageInsertForm';
import { SelfStorageRow } from '../routes/data/auctions/selfStorage/SelfStorageRow';
import { addressConvertIn, addressInitial } from '../routes/embedded/address';
import { FacilityHeader } from '../routes/data/auctions/facility/FacilityHeader';
import { FacilityRow } from '../routes/data/auctions/facility/FacilityRow';
import { DTO } from '../routes/providers/InsertFormCtxt';
import { ObjectId } from 'bson';

export const $reference: Record<string, { initial: () => any; convertTo: (x: any) => any; children: JSX.Element[] }> = {
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
        initial: () => {
            const facility = {} as any;
            facility._id = new ObjectId().toHexString();
            facility.phoneNumber = '';
            facility.email = '';
            facility.address = JITTRegistrar.getInitial($$names.embedded.address)();
            facility.facilityNumber = '';
            Object.defineProperty(facility, 'name', {
                get: function (this: any) {
                    return `${this.selfStorage?.name ?? ''} - ${this.address?.city ?? ''}, ${this.address?.state ?? ''} - ${this.address?.street?.split(' ')?.slice(1).join(' ') ?? ''}`;
                }
            });
            return facility;
        },
        convertTo: facilityConvertIn,
        children: [
            <OutputControl key={1} name='name' span={2} stringify={identity} parse={identity} />,
            <InputControl key={2} name='facilityNumber' type='text' stringify={identity} parse={identity} />,
            <SelectControl key={3} name='selfStorage' lookup={$$names.auctions.selfStorage} />,
            <InputControl key={4} name='phoneNumber' type='tel' placeholder='(619) 555-1212' stringify={formatTel} parse={parseTel} autoComplete='tel' />,
            <InputControl key={5} name='email' type='email' placeholder='john.doe@example.com' />,
            <FieldSetControl key={6} name='address' />
        ]
    },
    [$$names.auctions.auctionSite]: {
        initial: ignore,
        convertTo: ignore,
        children: [] as any
    },
    [$$names.auctions.lot]: {
        initial: ignore,
        convertTo: ignore,
        children: [] as any
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
    }
};
