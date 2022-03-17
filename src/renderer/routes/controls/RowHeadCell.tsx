import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/pro-regular-svg-icons';
import { toHexString } from '../../util/toHexString';

export function RowHeadCell({ data, ...remain }: { data: IRealmDTO } & React.ComponentPropsWithoutRef<'th'>) {
    return <th scope='row' title={toHexString(data)} {...remain}>
        <FontAwesomeIcon icon={faKey} className='icon-cell' />
    </th>;
}
