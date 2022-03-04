import { TextFieldProps, LabelComponent, ContainerComponent } from './SelfStorage';
import { Field } from "./Field";
import { $$Elements, ForwardComponents } from './$$Elements';

export function TextField(props: TextFieldProps<string> & React.ComponentPropsWithoutRef<'input'>) {
    const { converts, ...remain } = props;
    return (
        <Field
            converts={[(x: string) => x, (x: string) => x] as ConversionOrCalculation<string, string>}
            {...remain}
            containerLabel='container'
            Container={ForwardComponents.div as ContainerComponent}
            Label={ForwardComponents.label as LabelComponent}
            Feedback={ForwardComponents.small}
            Control={ForwardComponents.input} />
    );
}

export function DataListField(props: TextFieldProps<string> & { list: string, map: Record<string, string> }) {
    const { converts, map, list, ...remain } = props;
    return (
        <Field
            converts={[(x: string) => map[x], (x: string) => new Map(Array.from(Object.entries(map))).get(x)!] as ConversionOrCalculation<string, string>}
            {...remain}
            containerLabel='container'
            Container={ForwardComponents.div as ContainerComponent}
            Label={ForwardComponents.label as LabelComponent}
            Feedback={ForwardComponents.small}
            Control={ForwardComponents.input}>
        </Field>
    );
}
