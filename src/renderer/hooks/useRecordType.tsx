import { useParams } from 'react-router-dom';
import { $$Schema } from '../db';
/**
 * @deprecated
 */
export function useRecordType() {
    const { type } = useParams();
    if (type == null) throw new Error(`undefined RecordType`);
    return [type, $$Schema[type]];
}
