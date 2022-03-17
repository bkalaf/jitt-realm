import { ObjectId } from '../controls/index';
import { InsertFormProvider } from '../providers/InsertFormCtxt/index';
import { Boundary } from '../../components/suspense/Boundary';

/**
 * @deprecated
 */
export type FormProps = {
    onSubmit: () => void;
    onCancel: () => void;
    onReset: () => void;
    formID: string;
    displayName: string;
    headerID: string;
    buttonsID: string;
    submitBtnID: string;
    cancelBtnID: string;
    resetBtnID: string;
};

/**
 * @deprecated
 */
export function InsertForm<TFormData extends { _id: ObjectId }>({ children, type, initial, realm }: { realm: Realm; initial: () => TFormData; type: string; children?: Children }) {
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <InsertFormProvider initial={initial} type={type} realm={realm}>
                {children}
            </InsertFormProvider>
        </Boundary>
    );
}
