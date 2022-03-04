import React from 'react';
// import { $countries, $provinces } from '../components/forms';
import { useProvideDataLists } from '../hooks/useProvideDataLists';

// export type IDataListContext = {
//     [$countries]: React.ReactPortal;
//     [$provinces]: React.ReactPortal;
// };

export const DataListContext = React.createContext<undefined | Record<string, React.ReactPortal>>(undefined);

export function DataListProvider({ children }: { children: Children }) {
    const value = useProvideDataLists();
    return <DataListContext.Provider value={value}>{children}</DataListContext.Provider>;
}
