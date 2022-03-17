import { ObjectId } from 'bson';

export function lookupObject<T>(realm: Realm, type: string) {
    return function (hexString: string) {
        return realm.objectForPrimaryKey<T>(type, new ObjectId(hexString));
    };
}
