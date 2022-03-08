import { ObjectId } from 'bson';
import { TextFieldProps, LabelComponent, ContainerComponent } from './SelfStorage';
import { Field } from './Field';
import { ForwardComponents } from './$$Elements';
import { useDebugValue } from 'react';

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
            converts={[(x: ObjectId) => x.toHexString(), (x: string) => new ObjectId(x)]}
        ></Field>
    );
}
