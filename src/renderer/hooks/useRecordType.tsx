import { useParams } from 'react-router-dom';
import { $$Schema } from '../db';
import { $SelfStorage, SelfStorage } from '../db/SelfStorage';
import { $Address, Address } from '../db/Address';
import { $Facility, Facility } from '../db/Facility';
import { Logger } from '../layout/Logger';

export function useRecordType<T extends Objects>(): [T, JittClass<T extends $SelfStorage ? SelfStorage : T extends $Address ? Address : T extends $Facility ? Facility : never>] {
    Logger.enter('useRecordType');
    const { type } = useParams();
    if (type == null) throw new Error(`undefined RecordType`);
    return [type as T, $$Schema[type]];
}
