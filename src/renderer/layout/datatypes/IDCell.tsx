import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderCell } from '../HeaderCell';

export function IDCell({ data, name }: { data: Realm.Object & any; name: string }) {
    return (
        <HeaderCell scope='row' title={data._id.toHexString()}>
            <FontAwesomeIcon icon={faKey} size='1x' />
        </HeaderCell>
    );
}
