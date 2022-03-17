import { FormBaseCtxt } from '../providers/InsertFormCtxt/index';
import { useContext } from 'react';

export function useFormBase() {    
    const result = useContext(FormBaseCtxt);
    if (result == null) alert('null context');
    return result!;
}
