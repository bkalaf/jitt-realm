import { faKey } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelfStorage } from './index';

export function SelfStorageRow({ data, index, typeName }: { data: Realm.Object & SelfStorage; index: number; typeName: string }) {
    const id = `${typeName}-#${index}`;
    console.log(JSON.stringify(data));
    return (
        <tr id={id}>
            <th scope='row' title={data._id.toHexString()}>
                <FontAwesomeIcon icon={faKey} className='inline-flex bg-black text-yellow' />
            </th>
            <td>{data.name}</td>
            <td>{data.website}</td>
            <td>{data.facilities ? data.facilities.length : 0}</td>
        </tr>
    );
}
