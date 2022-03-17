import * as BSON from 'bson';

export function lookupObject(realm: Realm, type: string) {
    return function (hexString: string) {
        return realm.objectForPrimaryKey(type, new BSON.ObjectId(hexString));
    };
}
