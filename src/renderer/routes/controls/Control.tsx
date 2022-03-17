import { FormProvidedProps } from '../props/FormProvidedProps';
import { useInsertForm } from '../../hooks/useInsertForm';
import { ControlOnlyProps } from '../props/ControlOnlyProps';

export const $tags = {
    Input: 'input',
    Fieldset: 'fieldset',
    Output: 'output',
    Dropdown: 'select',
    List: 'list',
    Dictionary: 'dictionary'
};
function Frag() {
    return <></>;
}
function Field() {
    return <div></div>;
}
function Label() {
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    return <label></label>;
}
function Legend() {
    return <legend></legend>;
}
function Feedback() {
    return <small></small>;
}
function Select() {
    return <select></select>;
}
function Dual() {
    return <select></select>;
}
function List() {
    return <select></select>;
}
function InputButton() {
    return <div></div>;
}
function Descendants() {
    return <></>;
}
function Null() {
    return null;
}
function Identity(Comp: any, Child: any) {
    return (
        <Comp>
            <Child />
        </Comp>
    );
}

export type FieldComponents = IFieldSetComponent | IOutputComponent | IInputComponent | IDropdownComponent;
export function toIDs(
    obj: any,
    Component: FieldComponents
): {
    fieldID: (s: string) => string;
    controlID?: (s: string) => string;
    labelID: ((s: string) => string) | undefined;
    feedbackID?: ((s: string) => string) | undefined;
    optionID?: ((s: string, ix: number) => string) | undefined;
    Container: React.FunctionComponent<React.ComponentPropsWithoutRef<any>>;
    Control: React.FunctionComponent<React.ComponentPropsWithoutRef<any>>;
    ControlChildren: React.FunctionComponent<React.ComponentPropsWithoutRef<any>>;
    Label: React.FunctionComponent<React.ComponentPropsWithoutRef<any>>;
    Feedback: React.FunctionComponent<React.ComponentPropsWithoutRef<any>>;
    ComponentChildren: React.FunctionComponent<React.ComponentPropsWithoutRef<any>>;
} {
    const context = Component.displayName as keyof typeof $tags;
    switch (context) {
        case 'Input':
            return {
                fieldID: obj.fieldID as (s: string) => string,
                controlID: obj.inputID as (s: string) => string,
                labelID: obj.labelID as (s: string) => string,
                feedbackID: obj.feedbackID as (s: string) => string,
                optionID: undefined,
                Container: Field,
                Control: Component,
                ControlChildren: Frag,
                Label: Label,
                Feedback: Feedback,
                ComponentChildren: Null
            };
        case 'Fieldset':
            return {
                fieldID: obj.fieldsetID as (s: string) => string,
                labelID: obj.legendID as (s: string) => string,
                Container: Component,
                Control: Null,
                ControlChildren: Frag,
                Label: Legend,
                Feedback: Frag,
                ComponentChildren: Descendants
            };
        case 'Dropdown':
            return {
                fieldID: obj.fieldID as (s: string) => string,
                controlID: obj.inputID as (s: string) => string,
                labelID: obj.labelID as (s: string) => string,
                feedbackID: obj.feedbackID as (s: string) => string,
                optionID: obj.optionID as (s: string, ix: number) => string,
                Container: Field,
                Control: Component,
                ControlChildren: Descendants,
                Label: Label,
                Feedback: Feedback,
                ComponentChildren: Null
            };
        case 'Output':
            return {
                fieldID: obj.fieldID as (s: string) => string,
                controlID: obj.outputID as (s: string) => string,
                labelID: obj.labelID as (s: string) => string,
                feedbackID: obj.feedbackID as (s: string) => string,
                optionID: undefined,
                Container: Field,
                Control: Component,
                ControlChildren: Null,
                Label: Label,
                Feedback: Feedback,
                ComponentChildren: Null
            };
        case 'List':
            return {
                fieldID: obj.fieldID as (s: string) => string,
                controlID: obj.inputID as (s: string) => string,
                labelID: obj.labelID as (s: string) => string,
                feedbackID: obj.feedbackID as (s: string) => string,
                optionID: obj.optionID as (s: string, ix: number) => string,
                Container: Field,
                Control: Dual,
                ControlChildren: InputButton,
                Label: Label,
                Feedback: Component,
                ComponentChildren: Descendants
            };
        case 'Dictionary':
            return {
                fieldID: obj.fieldID as (s: string) => string,
                controlID: obj.inputID as (s: string) => string,
                labelID: obj.labelID as (s: string) => string,
                feedbackID: obj.feedbackID as (s: string) => string,
                optionID: obj.optionID as (s: string, ix: number) => string,
                Container: Field,
                Control: Dual,
                ControlChildren: InputButton,
                Label: Label,
                Feedback: Component,
                ComponentChildren: Descendants
            };
    }
}
export type IFieldSetComponent = React.FunctionComponent;
export type IOutputComponent = React.FunctionComponent;
export type IInputComponent = React.FunctionComponent;
export type IDropdownComponent = React.FunctionComponent;
export type ILegendComponent = React.FunctionComponent;

