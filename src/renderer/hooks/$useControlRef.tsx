import React from 'react';

export function $useControlRef<TElement extends DataEntryElement>() {
    return React.useRef<DataEntryElement | null>(null);
}
