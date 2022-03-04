import { useMemo } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function useDataList(list: string, options: Children) {
    const DataList = useMemo(() => <datalist id={list}>{options}</datalist>, [list, options]);
    const el = document.getElementById('datalist-root')!;
    return useMemo(() => ReactDOM.createPortal(DataList, el), [DataList, el]);
}
