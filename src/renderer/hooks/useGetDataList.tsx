import React from 'react';
import { IDataListContext, DataListContext } from '../providers/DataListContext';

export function useGetDataList(key: keyof IDataListContext) {
    const lists = React.useContext(DataListContext)!;
    return lists[key];
}
