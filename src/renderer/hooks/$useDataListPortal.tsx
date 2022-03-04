import React from 'react';
import { DataListContext } from '../providers/DataListContext';

export function useDataListPortal(key: string) {
    const context = React.useContext(DataListContext)!;
    return React.useMemo(() => context[key], [context, key]);
}
