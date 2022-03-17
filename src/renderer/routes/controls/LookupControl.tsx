import { toTitleCase } from '../../../common/text/toTitleCase';
import { toHexString } from '../../util/toHexString';
import { ofHexString } from '../data/auctions/facility/ofHexString';
import { SelectControl } from './SelectControl';

export function LookupControl({ display, ...spread }: { name: string; display?: string; lookup: string; optionLabel?: (x: any) => string } & React.ComponentPropsWithoutRef<'select'>) {
    return <SelectControl stringify={toHexString} validators={[]} display={display ?? toTitleCase(spread.name)} parse={ofHexString} {...spread} />;
}
