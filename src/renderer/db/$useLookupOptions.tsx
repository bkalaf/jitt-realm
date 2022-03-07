import Realm from 'realm';
import { ObjectId } from 'bson';

export function $useLookupOptions(realm: Realm, typeName: string, stringify: (x: any) => string) {
    console.log('useLookupOptions', typeName);
    return (
        <>
            <option value='' label='Choose an option...' />
            {realm.objects<{ _id: ObjectId }>(typeName).map((x, ix) => {
                console.log('option', x);
                return <option key={`dd-${typeName}-opt${ix}`} value={x._id.toHexString()} label={stringify(x)} />;
            })}
        </>
    );
}
