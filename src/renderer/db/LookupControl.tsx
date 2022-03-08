// import Realm from 'realm';
// import { ObjectId } from 'bson';
// import { FormControl } from '../components/forms/FormControl';
// import { useForm } from '../hooks/useForm';
// import { SelectControl } from '../components/forms/SelectControl';
// import { Convert, Stringify } from './Facility';
// import { LookupOptions } from "./LookupOptions";

import { BSON } from 'realm';
import { DbOutputType } from '../components/forms/DbFieldValue';
import { useRecordType } from '../hooks/useRecordType';

// export function LookupControlElement<T extends { _id: ObjectId }>({
//     getLabel,
//     name,
//     displayName,
//     realm,
//     type
// }: {
//     name: string;
//     displayName: string;
//     realm: Realm;
//     type: string;
//     getLabel: (x: T) => string;
// }) {
//     const { getValue, setValue } = useForm();
//     return (
//         <FormControl
//             getValue={getValue}
//             setValue={setValue}
//             name={name}
//             displayName={displayName}
//             convert={Convert.lookup(realm, type)}
//             stringify={Stringify.lookup as any}>
//             <SelectControl required>
//                 <LookupOptions realm={realm} type={type} getLabel={getLabel} />
//             </SelectControl>
//         </FormControl>
//     );
// }

export function LookupControl<T extends DbOutputType & { _id: BSON.ObjectId }>({ name, displayName, realm }: { name: string; displayName: string; realm: Realm }) {
    const [type, Ctor] = useRecordType();
    const options = realm
        .objects<{ _id: BSON.ObjectId }>(type)
        .map((x) => [x._id.toHexString(), Ctor.toDisplayName(x)] as [string, string])
        .map(([key, value], index) => <option key={index} value={key} label={value} />);
    return (
        <></>
        // <ControlBase
        //     controlTag='select'
        //     labelTag='label'
        //     containerTag='div'
        //     initial={() => ''}
        //     name={name}
        //     displayName={displayName}
        //     feedbackTag='div'
        //     toBacking={((x: string) => realm.objectForPrimaryKey(type, new BSON.ObjectId(x))) as any}
        //     toOutput={((x: T) => x._id.toHexString()) as any}
        //     validators={[]}>
        //     {options}
        // </ControlBase>
    );
}
