import Realm from 'realm';
import { ObjectId } from 'bson';
import { $$Schema } from './index';
import { Field } from './Field';
import { useRecordType } from '../hooks/useRecordType';
import { ForwardComponents } from './$$Elements';
import { $useLookupOptions } from "./$useLookupOptions";
import { ContainerComponent, LabelComponent } from './SelfStorage';

export function LookupField<T extends { _id: ObjectId; }>({
    name, display, realm, mapping
}: {
    name: string;
    realm: Realm;
    display?: string;
    mapping?: Record<string, string>;
}) {
    const [type, Ctor] = useRecordType();
    const { objectType }: Realm.ObjectSchemaProperty = realm.schema.filter((x) => x.name === type)[0].properties[name] as any;
    if (objectType == null)
        throw new Error(`Unable to find property type: ${type}/${name}`);

    const options = $useLookupOptions(realm, objectType, $$Schema[objectType].toDisplayName.bind(null));
    return (
        <Field
            display={display}
            name={name}
            labelLabel='label'
            containerLabel='container'
            Container={ForwardComponents.div as ContainerComponent}
            Label={ForwardComponents.label as LabelComponent}
            Feedback={ForwardComponents.small}
            Control={ForwardComponents.select}
            toOutput={mapping == null ? undefined : (x: string) => mapping[x]}
            converts={[(x: T | undefined) => x?._id.toHexString() ?? '', (x: string | undefined) => onlyIfNotNullOrEmpty(x, a => realm.objectForPrimaryKey<T>(objectType, new ObjectId(a)))]}>
            {options}
        </Field>
    );
}
export function onlyIfNotNullOrEmpty<T, U>(value: T | null | undefined, func: (x: T) => U) {
    if (value == null || (('length' in value) ? ((value as any).length === 0) : false)) {
        return undefined;
    } 
    return func(value);
}