import React, { createContext } from 'react';
import { EmbeddedContextProvider } from '../EmbeddedContext';
import { useProvideInsertForm } from '../../../hooks/useProvideInsertForm';
import { ObjectId } from '../../controls/index';
import { FormProvidedProps } from '../../props/FormProvidedProps';
import { Boundary } from '../../../components/suspense/Boundary';
import { Result } from "../../../hooks/Result";

/**
 * @deprecated
 */
export type InsertFormContext<T extends IRealmDTO = IRealmDTO> = FormProvidedProps<DataEntryElement, T> & { formDisplayName: string };
export const InsertFormCtxt = React.createContext<InsertFormContext | undefined>(undefined);

export type DTO = { _id: ObjectId };

export type FormBaseContext = {
    onSubmit: () => void;
    onCancel: () => void;
    onReset: () => void;
    feedbacking: boolean;
    formName: string;
    formHeader: string;
    getValue: (propName: string, stringify: IStringifyFunction) => () => any;
    setValue: (propName: string, parse: IParseFunction) => (value: any) => void;
    subscribe: (propName: string, ref: React.RefObject<DataEntryElement>, v: ((x: any) => Result<any>)[]) => () => void;
};
export const FormBaseCtxt = createContext<FormBaseContext | undefined>(undefined);



// export function FormBaseProvider<TDto extends DTO>({
//     children,
//     type,
//     realm,
//     name,
//     initial,
//     drillOnSuccess
// }: {
//     name: string;
//     type: string;
//     children: Children;
//     realm: Realm;
//     drillOnSuccess: boolean;
//     initial: () => TDto;
// }) {
//     return (
//         <FormProvider drillOnSuccess={drillOnSuccess} name={name} type={type} realm={realm} initial={initial}>
//             {children}
//         </FormProvider>
//     );
// }

/**
 * @deprecated
 */
export function InsertFormProvider({ realm, initial, type, children }: { realm: Realm; type: string; initial: () => Record<string, any> & { _id: ObjectId }; children?: Children }) {
    const value = useProvideInsertForm(initial, type, realm);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <InsertFormCtxt.Provider value={value}>
                <EmbeddedContextProvider realm={realm} type={type}>
                    {children}
                </EmbeddedContextProvider>
            </InsertFormCtxt.Provider>
        </Boundary>
    );
}
