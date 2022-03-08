import { useNavigate } from 'react-router-dom';
import { usePreventDefault } from '../hooks/usePreventDefault';
import { useRecordType } from '../hooks/useRecordType';
import { useCallback } from 'react';
import { ObjectId } from 'bson';
import { useTheme } from '../providers/useTheme';
import { ButtonGroup } from '../components/footer/ButtonGroup';
import { FormButton } from '../components/footer/FormButton';
import { useForm2 } from '../hooks/useForm2';
import { Boundary } from '../components/suspense/Boundary';

/**
 * @deprecated
 */
export function InsertForm<T, TEvent extends React.ChangeEvent<DataEntryElement>, TFormData extends Record<string, any>>({ children }: { realm: Realm; children: Children }) {
    const prevent = usePreventDefault();
    const { onCancel, onReset, onInput, onSubmit } = useForm2();
    const className = useTheme({}, '', 'form', 'insert');

    console.log('Children', React.Children.toArray(children)[0]);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <form className={className} id='insert-form' onReset={prevent} onSubmit={prevent} onInput={onInput}>
                <section className='contents'>
                    {children}
                    {/* {React.cloneElement(React.Children.toArray(children)[0] as React.ReactElement, {...(React.Children.toArray(children)[0] as React.ReactElement).props as Record<string, any>, realm })} */}
                </section>
                <hr className='w=full col-span-4' />
                <footer className='w-full col-span-4'>
                    <ButtonGroup>
                        <FormButton type='button' onClick={onCancel}>
                            Cancel
                        </FormButton>
                        <FormButton type='button' onClick={onReset}>
                            Reset
                        </FormButton>
                        <FormButton type='button' onClick={onSubmit}>
                            Submit
                        </FormButton>
                    </ButtonGroup>
                </footer>
            </form>
        </Boundary>
    );
}
