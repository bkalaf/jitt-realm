import { ObjectId } from 'bson';
import { TextFieldProps } from './SelfStorage';
import { ContainerComponent } from "./ContainerComponent";
import { LabelComponent } from "./LabelComponent";
import { Field } from './Field';
import { useDebugValue } from 'react';
import { ForwardComponents } from './$FC';

/**
 * @deprecated
 */
export function ObjectIdField(props: TextFieldProps<ObjectId>) {
    useDebugValue((props as any).value);
    return (
        <Field
            {...props}
            containerLabel='container'
            Container={ForwardComponents.div as ContainerComponent}
            Label={ForwardComponents.label as LabelComponent}
            Feedback={ForwardComponents.small}
            Control={ForwardComponents.input}
            converts={[(x: ObjectId | undefined) => x?.toHexString() ?? '', (x: string | undefined) => x ? new ObjectId(x) : new ObjectId()]}
        ></Field>
    );
}
