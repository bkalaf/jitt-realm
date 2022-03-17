import { DTO } from '../providers/InsertFormCtxt';

export function SimpleLookup({
    displayName,
    value,
    name,
    setValue,
    lookup,
    optionLabel,
    realm
}: {
    displayName: string;
    name: string;
    value: string;
    setValue: StateSetter<string>;
    lookup: string;
    realm: Realm;
    optionLabel: (x: any) => string;
}) {
    return (
        <div className='flex flex-col-reverse'>
            <select id={[name, 'lookup', 'dropdown'].join('-')} className='control' value={value} onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => setValue(ev.target.value)}>
                <option label='Choose a value...' value='' />
                {realm
                    .objects<DTO>(lookup)
                    .map((x) => [x._id.toString(), optionLabel(x)] as [string, string])
                    .map(([k, v], ix) => (
                        <option key={ix} label={v} value={k} />
                    ))}
            </select>
            <label id={[name, 'lookup', 'dropdown', 'label'].join('-')} htmlFor={[name, 'lookup', 'dropdown'].join('-')}>
                {displayName}
            </label>
        </div>
    );
}
