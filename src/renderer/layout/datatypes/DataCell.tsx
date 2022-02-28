import { useEffect, useRef } from 'react';
import { Cell } from '../Cell';

export function DataCell({ data, name, alt }: { data: Realm.Object & Record<string, ArrayBuffer>; alt?: string; name: string }) {
    const objectURL = useRef<string | null>(null);
    useEffect(() => {
        const url = URL.createObjectURL(new Blob([data[name]]));
        objectURL.current = url;
        return () => {
            if (objectURL.current != null) {
                URL.revokeObjectURL(objectURL.current);
                objectURL.current = null;
            }
        };
    }, [data, name]);
    return (
        <Cell>
            <img src={objectURL.current ?? undefined} alt={alt} />
        </Cell>
    );
}
