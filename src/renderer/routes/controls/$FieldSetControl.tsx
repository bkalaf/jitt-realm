import { EmbeddedContextProvider } from '../forms/EmbeddedContextProvider';
import { useAdjustNames } from './useAdjustNames';

export function $FieldSetControl({ children, name: $name, display, ...remain }: { name: string; children: Children; display?: string }) {
    const { displayName, fullName, name, fieldsetID, legendID } = useAdjustNames($name, display);
    return (
        <fieldset name={fullName} id={fieldsetID}>
            <legend id={legendID}>{displayName}</legend>
            <EmbeddedContextProvider name={name}>{children}</EmbeddedContextProvider>
        </fieldset>
    );
}
