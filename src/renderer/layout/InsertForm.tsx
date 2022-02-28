import { useNavigate } from 'react-router-dom';
import { usePreventDefault } from './usePreventDefault';
import { useRecordType } from './useRecordType';
import { useRealmSchema } from './useRealmSchema';
import { useCallback, useMemo, useState } from 'react';
import { ObjectId } from 'bson';
import { getAssocPath } from '../common/obj/getAssocPath';
import { useTheme } from '../providers/ThemeProvider';
import { setAssocPath } from '../common/obj/setAssocPath';

export function InsertForm({ realm }: { realm: Realm }) {
    const navigate = useNavigate();
    const [type, Ctor] = useRecordType();
    const { getColumnsInfo, getColumnsList, getTypeInfo, getFields } = useRealmSchema(realm);
    const prevent = usePreventDefault();
    const fields = useMemo(() => getFields(type), [getFields, type]);
    console.log('fields', fields);
    const infos = useMemo(() => getColumnsInfo(type), [getColumnsInfo, type]);
    const columns = useMemo(() => getColumnsList(type), [getColumnsList, type]);
    console.log('infos', infos);
    const [formData, setFormData] = useState(Ctor.convertFrom(Ctor.init()));
    const getValue = useCallback(
        (name: string) => () => {
            return getAssocPath(name, formData);
        },
        []
    );
    const setValue = useCallback(<T extends DataEntryElement>(name: string) => (ev: React.ChangeEvent<T>) => {
        setFormData(prev => {
            const copied = {...prev};
            return setAssocPath(name, copied, ev.target.value);
        })
    }, [])
    const onSubmit = useCallback(() => {
        try {
            realm.write(() => {
                const record = realm.create<{ _id: ObjectId }>(type, Ctor.convertTo(formData), Realm.UpdateMode.All);
                navigate(`../${record._id.toHexString()}`);
            });
        } catch (error) {
            console.error(error);
        }
    }, [realm, navigate, type, formData]);
    const onCancel = useCallback(() => {
        navigate('..');
    }, []);
    const className = useTheme({}, '', 'form', 'insert');
    return (
        <div>
            <div>New Record</div>
            <form className={className} id='insert-form' onReset={prevent} onSubmit={prevent}>
                {/*                 
                <button type='button' onClick={onSubmit}>
                    Submit
                </button>
                <button type='button' onClick={onSubmit}>
                    Reset
                </button> */}
                {columns.map(x => infos.get(x.columnName)).map(x => <div><div>{x?.columnName}</div>{x?.propertyName}</div>)}
                <ButtonGroup>
                    <FormButton type='button' onClick={onCancel}>
                        Cancel
                    </FormButton>
                    <FormButton type='button'>Reset</FormButton>
                    <FormButton type='button' onClick={onSubmit}>
                        Submit
                    </FormButton>
                </ButtonGroup>
            </form>
        </div>
    );
}
export function FormButton({ children, ...remain }: { children?: Children } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const className = useTheme({}, '', 'form', 'insert', 'buttonGroup', 'button');
    return (
        <button className={className} {...remain}>
            {children}
        </button>
    );
}

export function ButtonGroup({ children }: { children?: Children }) {
    const className = useTheme({}, '', 'form', 'insert', 'buttonGroup');
    return <div className={className}>{children}</div>;
}
