import { ContainerComponent } from "./ContainerComponent";
import { LabelComponent } from "./LabelComponent";
import { Field } from './Field';
import { ForwardComponents } from './$FC';
/**
 * @deprecated
 */
export function CalculatedField<T, U extends Record<string, string>>({ name, calculationFunction }: { name: string; calculationFunction: (formData: T, calcObject: U) => string }) {
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
