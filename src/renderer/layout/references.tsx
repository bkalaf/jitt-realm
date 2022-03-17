import { SortDescriptor } from 'realm';
import { identity } from '../../common/identity';
import { ignore } from '../../common/ignore';
import { countryMap } from '../db/enums/CountryISO2';
import { provinceMap } from '../db/enums/Provinces';
import { $$names, FieldSetControl, InputControl, OutputControl, SelectControl, TextInputControl } from '../routes/controls';
import { echoString, facilityConvertIn, facilityInitial, parseTel } from '../routes/data/auctions/facility/index';
import { formatTel } from '../routes/data/auctions/facility/formatTel';
import { SelfStorageHeaders } from '../routes/data/auctions/selfStorage/SelfStorageHeaders';
import { selfStorageConvertIn, selfStorageInitial } from '../routes/data/auctions/selfStorage/SelfStorageInsertForm';
import { SelfStorageRow } from '../routes/data/auctions/selfStorage/SelfStorageRow';
import { addressConvertIn, addressInitial } from '../routes/embedded/address';

export const $reference: Record<string, { initial: () => any, convertTo: (x: any) => any, children: JSX.Element[] }> = {
    [$$names.embedded.address]: {
        initial: addressInitial,
        convertTo: addressConvertIn,
        children: [
            <InputControl key={0} name='street' type='text' validators={[]} parse={identity} stringify={echoString} autoComplete='street' />,
            <InputControl key={1} name='suite' validators={[]} parse={identity} stringify={echoString} type='text' />,
            <InputControl key={2} name='city' validators={[]} parse={identity} stringify={echoString} type='text' autoComplete='city' />,
            <SelectControl key={3} name='state' lookup={provinceMap} autoComplete='state' parse={identity} stringify={identity} validators={[]} />,
            <SelectControl key={4} name='country' lookup={countryMap} autoComplete='country' parse={identity} validators={[]} stringify={identity} />,
            <InputControl key={5} name='postal' validators={[]} parse={identity} stringify={echoString} type='text' autoComplete='postalCode' />
        ]
    },
    [$$names.auctions.selfStorage]: {
        initial: selfStorageInitial,
        convertTo: selfStorageConvertIn,
        children: [<TextInputControl key={1} type='text' name='name' required />, <TextInputControl key={2} type='url' name='website' />]
    },
    [$$names.auctions.facility]: {
        initial: facilityInitial,
        convertTo: facilityConvertIn,
        children: [
            <OutputControl key={1} name='name' span={2} validators={[]} stringify={identity} parse={identity} />,
            <InputControl key={2} name='facilityNumber' type='text' validators={[]} stringify={identity} parse={identity} />,
            <SelectControl key={3} name='selfStorage' lookup={$$names.auctions.selfStorage} validators={[]} />,
            <InputControl key={4} name='phoneNumber' type='tel' placeholder='(619) 555-1212' stringify={formatTel} parse={parseTel} autoComplete='tel' validators={[]} />,
            <InputControl key={5} name='email' type='email' placeholder='john.doe@example.com' validators={[]} stringify={echoString} parse={identity} />,
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
export const $grid = {
    [$$names.auctions.selfStorage]: {
        GridHeaders: SelfStorageHeaders,
        TableRow: SelfStorageRow,
        sort: [['name', false]] as SortDescriptor[]
    }
};
