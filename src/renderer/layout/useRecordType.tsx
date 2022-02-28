import { useParams } from 'react-router-dom';
import { $$Schema } from '../db';
import { $SelfStorage, SelfStorage } from '../db/SelfStorage';
import { $Address, Address } from '../db/Address';
import { $Facility, Facility } from '../db/Facility';

export function useRecordType<T extends Objects>(): [
    T,
    JittClass<T extends $SelfStorage ? SelfStorage : T extends $Address ? Address : T extends $Facility ? Facility : never>
] {
    const { type } = useParams();
    if (type == null) throw new Error(`Unknown RecordType: ${type}`);
    return [type as T, $$Schema[type]];
}
