import { useContext } from 'react';
import { RealmContext } from '../providers/RealmProvider';

export function useRealm() {
    return useContext(RealmContext)!;
}
