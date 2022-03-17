import { $$Schema } from '../../db/index';
import { EnumCell } from './EnumCell';
import { useRealmSchema } from '../useRealmSchema';

export function DropdownCell<T extends React.SelectHTMLAttributes<HTMLSelectElement> = React.SelectHTMLAttributes<HTMLSelectElement>>({
    data,
    propertyName,
    datatype,
    enumMap,
    realm,
    name,
    ...remain
}: IPropertyProps<HTMLSelectElement> & { realm: Realm; data: Realm.Object & Record<string, any> }) {
    const { getTypeInfo } = useRealmSchema(realm);
    const result = getTypeInfo(datatype);
    switch (result) {
        case 'embedded':
        case 'lookup': {
            const optionMap = enumMap
                ? enumMap
                : realm
                      .objects(datatype)
                      .map((x) => [x._objectId(), $$Schema[datatype].toDisplayName(x)] as [string, string])
                      .map(([k, v]) => ({ [k]: v }))
                      .reduce((pv, cv) => ({ ...pv, ...cv }), {});
            return <EnumCell {...remain} name={name} enumMap={optionMap} data={data} />;
        }
        case 'neither':
            return <EnumCell {...remain} name={name} enumMap={enumMap ?? {}} data={data} />;
    }
}
