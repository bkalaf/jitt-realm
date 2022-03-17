import { useInsertForm } from '../../hooks/useInsertForm';
import { useValidation } from '../../hooks/useValidation';
import { useUnsavedTracking } from '../../hooks/useUnsavedTracking';
import { useEmbedded } from '../../hooks/useEmbedded';


export function ControlBase<T, K extends keyof T & string>({ display, columnName, validators }: { columnName: K; validators: Validator2<T>[]; display: string; }) {
    const { type } = useEmbedded();
    const { subscribe, unsubscribe, addError, getter, setter } = useInsertForm(type, display);
    const [unsaved, setUnsaved, clearUnsaved, isUnsaved] = useUnsavedTracking();
    const ref = useValidation(isUnsaved, columnName, subscribe, unsubscribe, validators);
}
