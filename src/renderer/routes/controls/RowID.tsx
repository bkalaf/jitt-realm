import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { ObjectId } from 'bson';

export function RowID({ data }: { data: Realm.Object & { _id: ObjectId; }; }) {
    return <th scope='row' title={data._id.toHexString()}>
        <FontAwesomeIcon icon={faKey} className='inline-flex bg-black text-yellow' />
    </th>;
}
