import React from 'react';
import { DataListContext } from '../providers/DataListContext';

export function useGetDataList(key: string) {
    const lists = React.useContext(DataListContext)!;
    return lists[key];
}
