import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { getAssocPath } from '../../../common/obj/getAssocPath';
import { Cell } from '../Cell';

export function BoolCell({ data, name }: { data: Realm.Object & Record<string, boolean>; name: string }) {
    const value = useMemo(() => (getAssocPath<boolean>(name, data) ? faCheckSquare : faSquare), []);
    return (
        <Cell>
            <FontAwesomeIcon className='inline-flex' icon={value} size='lg' />
        </Cell>
    );
}
