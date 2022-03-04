import { useMemo } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function useDataList(list: string, options: Children) {
    const el = document.getElementById('datalist-root')!;
    console.log('el', el);
    console.log(`mounting to datalist root: ${list}`);
    return useMemo(() => ReactDOM.createPortal(options, el), [options, el]);
}
