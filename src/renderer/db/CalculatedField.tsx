import { $useThemeClassNames, ContainerComponent, LabelComponent } from './SelfStorage';
import { $useControl } from '../hooks/$useControl';
import { Field } from './Field';
import { ForwardComponents } from './$$Elements';

export function CalculatedField<T, U extends Record<string, string>>({
    name,
    calculationFunction
}: {
    name: string;
    calculationFunction: (formData: T, calcObject: U) => string;
}) {
    const { backing } = $useControl(name, calculationFunction);
    const outputID = `${name}-output`;
    const className = $useThemeClassNames('output');
    return (
        <Field
            Container={ForwardComponents.div as ContainerComponent}
            Label={ForwardComponents.label as LabelComponent}
            Control={ForwardComponents.input}
            containerLabel='container'
            converts={calculationFunction as ConversionOrCalculation<T, string, U> as any}
            name={name}
        />
    );
}
