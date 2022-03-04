import { $SelfStorage, SelfStorage } from './SelfStorage';
import { $Address, Address } from './Address';
import { $Facility, Facility } from './Facility';

export function ifEmpty(str: string) {
    return str != null ? str : undefined;
}

export type Objs = SelfStorage | Address | Facility;
export const schema: Array<JittClass<SelfStorage | Address | Facility>> = [SelfStorage, Address, Facility as any];

export const $$Schema: Record<string, JittClass<any>> = {
    [$SelfStorage]: SelfStorage as JittClass<SelfStorage>,
    [$Address]: Address as JittClass<Address>,
    [$Facility]: Facility as JittClass<Facility>
};
