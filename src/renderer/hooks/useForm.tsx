import { FormContext2 } from '../db/FormProvider';

export function useForm() {
    const value = React.useContext(FormContext2)!;
    return value;
}