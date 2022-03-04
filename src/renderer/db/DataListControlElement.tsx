// import { FormControl } from '../components/forms/FormControl';
// import { useForm } from '../hooks/useForm';
// import { IDataListContext } from '../providers/DataListContext';

// export function DataListControlElement<T>({
//     name,
//     displayName,
//     convert,
//     list
// }: {
//     name: string;
//     displayName: string;
//     convert: (x: string) => T;
//     list: keyof IDataListContext;
// }) {
//     const { getValue, setValue } = useForm();
//     return (
//         <FormControl getValue={getValue} setValue={setValue} name={name} displayName={displayName} convert={convert}>
//             <DataListInput list={list}></DataListInput>
//         </FormControl>
//     );
// }
