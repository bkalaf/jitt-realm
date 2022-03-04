import { useMemo } from 'react';
import * as React from 'react';

export function Input({
    getValue,
    setValue,
    computedValue,
    ...remain
}: {
    computedValue: any;
    setValue: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    getValue: () => any;
}) {
    const value = useMemo(() => (computedValue ? computedValue : getValue() ?? ''), []);
    return <input onChange={setValue} value={value ?? ''} {...remain} />;
}


