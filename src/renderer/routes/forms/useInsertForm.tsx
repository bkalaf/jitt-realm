import { useContext } from 'react';
import { InsertFormCtxt } from './InsertForm';

export function useInsertForm() {
    return useContext(InsertFormCtxt)!;
}
