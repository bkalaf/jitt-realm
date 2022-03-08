import { RefObject } from 'react';
import { usePreventDefault } from '../../hooks/usePreventDefault';
import { Result } from '../../hooks/$useControl';
import { ButtonGroup } from '../../components/footer/ButtonGroup';
import { FormButton } from '../../components/footer/FormButton';
import React from 'react';
import { useInsertForm } from './useInsertForm';
import { $InputControl } from '../controls/SafeInputControl';
import { echoString } from '../data/auctions/facility';
import { identity } from '../../../common/identity';
import { EmbeddedContextProvider } from './EmbeddedContextProvider';
import { AutoComplete } from '../controls/_ControlProps';
import { InsertFormProvider } from './InsertFormProvider';
import { ObjectId } from '../controls';

export type GetErrors<T> = (name: string) => [React.RefObject<any>, string[]];

// export function InsertForm<T>({ initial, type, realm, children }: { initial: () => T; type: string; realm: Realm; children?: Children }) {
//     const navigate = useNavigate();
//     const wrapped = useCallback(() => {
//         const output = initial();
//         console.log('WRAPPED', Object.keys(output), Object.getOwnPropertyNames(output), Object.getOwnPropertyDescriptors(output), output);
//         return output;
//     }, [initial]);
//     const [formData, setFormData] = useState(wrapped);
//     const getter = useCallback(
//         (name: string) =>
//             function <T>(): T {
//                 return getAssocPath(name, formData);
//             },
//         [formData]
//     );

//     const setter = useCallback(
//         (name: string) => (value: any) => {
//             setFormData((fd: T) => {
//                 return setAssocPath(name, fd, value) as T;
//             });
//         },
//         []
//     );

//     const { upsert: addError, clear: clearErrors, get: getErrors, add: appendError } = useMap<string, [RefObject<any>, string[]]>([]);
//     const {
//         backing: validatorMap,
//         add: subscribe,
//         remove: unsubscribe,
//         get: getValidators
//     } = useMap<string, [React.RefObject<DataEntryElement>, Array<(x: any) => Result<any>>]>(
//         [],
//         (
//             [x1, x2]: [React.RefObject<DataEntryElement>, Array<(x: any) => Result<any>>],
//             [y1, y2]: [React.RefObject<DataEntryElement>, Array<(x: any) => Result<any>>]
//         ) => [x1, [...x2, ...y2]]
//     );
//     const [feedbacking, setFeedbacking] = useState(false);
//     const showFeedback = useCallback(() => setFeedbacking(true), []);
//     const hideFeedback = useCallback(() => setFeedbacking(false), []);
//     const logError = useCallback(
//         (name: string, ref: RefObject<DataEntryElement>, errors: string[]) => {
//             addError(name, [ref, errors]);
//             ref.current!.setCustomValidity(errors.join('\n'));
//         },
//         [addError]
//     );
//     const onValidate = useCallback(
//         (name: string) => {
//             const [ref, validators] = getValidators(name)!;
//             if (ref.current == null) return Result.toFail(`bad ref: ${name}`);
//             if (!isEmptyOrNull(ref.current.dataset.value)) {
//                 ref.current.setCustomValidity(`Field: ${name} has a temporary unsaved value: ${ref.current.dataset.value}`);
//             }
//             const result = validators.map((f) => f(eval(`formData.${name}`))).reduce(combineResult, Result.toPass(''));
//             const errors = Result.isFail(result)
//                 ? ref.current.validity.valid
//                     ? result.value
//                     : [...result.value, ref.current.validationMessage]
//                 : ref.current.validity.valid
//                 ? []
//                 : [ref.current.validationMessage];
//             logError(name, ref, errors);
//             return result;
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [getValidators, logError, formData]
//     );
//     const validate = useCallback(() => {
//         hideFeedback();
//         clearErrors();

//         const validArray = Array.from(validatorMap.current.keys());
//         const result: Result<SelfStorage> = validArray.map(onValidate).reduce(combineResultFirst, Result.toPass(formData));
//         if (Result.isFail(result)) {
//             showFeedback();
//         }
//         return result;
//     }, [clearErrors, formData, hideFeedback, onValidate, showFeedback, validatorMap]);
//     const memoized = useRef(formData);
//     const goBack = useGoPreviousOnClick();
//     const descend = useDescendOnClick();
//     const undo = useCallback(() => {
//         setFormData(memoized.current);
//     }, []);
//     const commit = useCallback(() => {
//         memoized.current = formData;
//     }, [formData]);
//     const onIgnore = usePreventDefault();
//     const formID = `${type}-insert-form`;
//     const display = toTitleCase(replaceAll('-', ' ')(formID));
//     const dialog = useDialog(
//         'Do you want to go to item just entered or enter more?',
//         'Wut to do?',
//         'question',
//         'Item Entered',
//         'Enter More',
//         'Goto Grid'
//     )((_id: ObjectId) => navigate(_id.toHexString()), undo, descend);
//     const onSubmit = useCallback(() => {
//         const isValid = validate();
//         try {
//             if (Result.isPass(isValid)) {
//                 realm.write(() => {
//                     const _id = realm.create<SelfStorage>(type, isValid.value, Realm.UpdateMode.Modified)._id;
//                     dialog(_id).then(commit);
//                 });
//             }
//         } catch (error) {
//             alert((error as Error).message);
//         }
//     }, [commit, dialog, realm, type, validate]);
//     const getError = useCallback(
//         (name: string) => {
//             return getErrors(name, [{ current: null }, []])![1];
//         },
//         [getErrors]
//     );
//     return (
//         <form className='grid grid-cols-4 bg-cyan' id={formID} name={type} onSubmit={onIgnore} onReset={onIgnore}>
//             <header className='col-span-4 ml-2 text-lg font-bold text-white bg-black border-2 rounded-t-xl border-cyan font-firaSans'>
//                 {display}
//             </header>
//             <InputControl
//                 key={0}
//                 inputType='text'
//                 name='_id'
//                 display='ID'
//                 validators={[]}
//                 required
//                 readOnly
//                 realm={realm}
//                 feedbacking={feedbacking}
//                 getter={getter}
//                 setter={setter as any}
//                 subscribe={subscribe}
//                 unsubscribe={unsubscribe}
//             />
//             {React.Children.toArray(children).map((x, ix) =>
//                 React.cloneElement(x as React.ReactElement, {
//                     ...(x as React.ReactElement).props,
//                     realm,
//                     feedbacking,
//                     key: ix + 1,
//                     getErrors: getError,
//                     setter,
//                     getter,
//                     subscribe,
//                     setter,
//                     unsubscribe
//                 })
//             )}
//             <footer className='w-full col-span-4 bg-black border-2 rounded-b-lg border-cyan'>
//                 <ButtonGroup>
//                     <FormButton id={`${formID}-reset-btn`} onClick={undo}>
//                         Reset
//                     </FormButton>
//                     <FormButton id={`${formID}-cancel-btn`} onClick={goBack}>
//                         Cancel
//                     </FormButton>
//                     <FormButton id={`${formID}-submit-btn`} onClick={onSubmit}>
//                         Submit
//                     </FormButton>
//                 </ButtonGroup>
//             </footer>
//         </form>
//     );
// }

export type FormProvidedProps<TElement extends DataEntryElement> = {
    feedbacking: boolean;
    realm: Realm;
    setter: <T>(propName: string) => (value: T) => void;
    getter: (propName: string) => any;
    subscribe: <T>(propName: string, value: [React.RefObject<TElement>, () => boolean, Array<Validator<any>>]) => void;
    unsubscribe: (name: string) => void;
    retrieveErrors: (name: string) => string[];
    placeholder?: string;
    autoComplete?: AutoComplete;
};
export type FormProps = {
    onSubmit: () => void;
    onCancel: () => void;
    onReset: () => void;
    formID: string;
    displayName: string;
};
export function wrapped<T>(initial: () => T) {
    const output = initial();
    return output;
}
export function evalGet<T>(formData: T, name: string) {
    return eval(`formData.${name}`);
}
export interface Validator<V> {
    <V>(x: V): Result<V>;
}

export type InsertFormContext = FormProvidedProps<DataEntryElement> & FormProps;
export const InsertFormCtxt = React.createContext<InsertFormContext | undefined>(undefined);

export function Form({ children }: { children?: Children }) {
    const { displayName, formID, onCancel, onReset, onSubmit } = useInsertForm();
    const preventDefault = usePreventDefault();
    return (
        <form id={formID} className='insert' onSubmit={preventDefault} onReset={preventDefault}>
            <header className='col-span-4 ml-2 text-lg font-bold text-white bg-black border-2 rounded-t-xl border-cyan font-firaSans'>{displayName}</header>
            <$InputControl type='text' name='_id' display='ID' validators={[]} required readOnly stringify={echoString} parse={identity} />
            {children}
            <footer>
                <ButtonGroup>
                    <FormButton id={`${formID}-reset-btn`} onClick={onReset}>
                        Reset
                    </FormButton>
                    <FormButton id={`${formID}-cancel-btn`} onClick={onCancel}>
                        Cancel
                    </FormButton>
                    <FormButton id={`${formID}-submit-btn`} onClick={onSubmit}>
                        Submit
                    </FormButton>
                </ButtonGroup>
            </footer>
        </form>
    );
}
export function InsertForm<TFormData extends { _id: ObjectId }>({ children, type, initial }: { initial: () => TFormData; type: string; children?: Children }) {
    const { displayName, feedbacking, formID, getter, onCancel, onReset, onSubmit, realm, retrieveErrors, setter, subscribe, unsubscribe } = useInsertForm();
    const preventDefault = usePreventDefault();
    return (
        <InsertFormProvider initial={initial} type={type} realm={realm}>
            <Form>{children}</Form>
        </InsertFormProvider>
    );
}
