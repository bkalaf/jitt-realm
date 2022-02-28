import { DataReader } from '../../common/resource';
import Realm from 'realm';
import internal from 'stream';
import { createContext } from 'react';
import { useProvideRealmContext } from './useProvideRealmContext';

export type IRealmContext = {
    reader: DataReader<Realm>
}
export const RealmContext = createContext<IRealmContext | undefined>(undefined);

export function RealmProvider({ children }: { children: Children }) {
    const value = useProvideRealmContext();
    return <RealmContext.Provider value={value}>
        {children}
    </RealmContext.Provider>
}