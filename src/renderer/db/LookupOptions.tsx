import Realm from 'realm';
import { ObjectId } from 'bson';
import { useMemo } from 'react';
import { Boundary } from '../components/suspense/Boundary';

export function LookupOptions<T extends { _id: ObjectId; }>({
    type, realm, getLabel
}: {
    realm: Realm;
    type: string;
    getLabel: (x: T) => string;
}) {
    const options = useMemo(() => realm
        .objects<T>(type)
        .map((obj) => [obj._id.toHexString(), getLabel(obj)])
        .map(([k, v], ix) => <option id={`option-#${ix}`} key={ix} value={k} label={v} data-_id={k} data-name={v} />), [getLabel, realm, type]);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <option value='' label='' data-name='' data-_id='' />
            {options}
        </Boundary>
    );
}
