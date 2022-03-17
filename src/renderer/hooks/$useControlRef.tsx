import React from 'react';
/**
 * @deprecated
 */
export function $useControlRef<TElement extends DataEntryElement>() {
    return React.useRef<DataEntryElement | null>(null);
}
