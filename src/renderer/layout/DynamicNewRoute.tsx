import { useMemo } from 'react';
import { useParams } from 'react-router';
import { InsertForm } from './Viewport';

export function DynamicNewRoute({ realm }: { realm: Realm }) {
    console.log('DynamicNewRoute');
    const { type } = useParams();
    const r = useMemo(() => JITTRegistrar.getInsertProps(type ?? ''), [type]);
    console.log(`r`, r, `type`, type);
    return <InsertForm realm={realm} type={type ?? ''} {...r}></InsertForm>;
}
