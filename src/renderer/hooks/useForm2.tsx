import { useContext } from 'react';
import { DbDataType, DbOutputType } from '../components/forms/DbFieldValue';
import { FormContext, IFormContext } from '../components/forms/FormContext';

export function useForm2<
    TBacking extends DbDataType,
    TOutput extends DbOutputType,
    TChanging extends DbOutputType,
    TElement extends DataEntryElement,
>() {
    return useContext(FormContext)!;
}
