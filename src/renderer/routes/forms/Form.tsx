import { usePreventDefault } from '../../hooks/usePreventDefault';
import { ButtonGroup } from '../../components/footer/ButtonGroup';
import { FormButton } from '../../components/footer/FormButton';
import { cloneElement, ReactElement } from 'react';
import { useProvideFormBase } from '../providers/InsertFormCtxt/useProvideFormBase';
import { PrimaryKeyField } from '../controls/index';

export function Form({ name, type, initial, convertTo, drillOnSuccess, children, realm }: { name: string; drillOnSuccess: boolean; type: string; children: Children; realm: Realm; initial: () => any; convertTo: (x: any) => any }) {
    console.log('Form');
    const { formHeader, formName, onCancel, onSubmit, onReset, ...rest } = useProvideFormBase(name, type, initial, convertTo, drillOnSuccess);
    console.log(rest);
    const preventDefault = usePreventDefault();
    return (
        <form id={formName} className='insert' onSubmit={preventDefault} onReset={preventDefault}>
            <header id={[formName, 'headers'].join('-')} className='form-header'>
                {formHeader}
            </header>

            {[<PrimaryKeyField key={0} {...rest}/>, ...React.Children.toArray(children)].map((x, ix) => cloneElement(x as ReactElement, { ...(x as ReactElement).props, key: ix + 1, formName, ...rest }))}
            <footer className='form-footer'>
                <ButtonGroup id={[formName, 'buttons'].join('-')} className='button-group'>
                    <FormButton id={[formName, 'reset', 'btn'].join('-')} onClick={onReset}>
                        Reset
                    </FormButton>
                    <FormButton id={[formName, 'cancel', 'btn'].join('-')} onClick={onCancel}>
                        Cancel
                    </FormButton>
                    <FormButton id={[formName, 'submit', 'btn'].join('-')} onClick={onSubmit}>
                        Submit
                    </FormButton>
                </ButtonGroup>
            </footer>
        </form>
    );
}
