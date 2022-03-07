import { useRef } from 'react';
import { SortDescriptor } from 'realm';

export function useRealmQuery(realm: Realm, typeName: string, ...sort: SortDescriptor[]) {
    const query = realm.objects(typeName).sorted(sort ?? []);
    return useRef(query);
}
