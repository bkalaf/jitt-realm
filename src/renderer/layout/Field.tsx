import { ReducerAction } from 'react';
import { useTheme } from "../providers/useTheme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faLock } from '@fortawesome/pro-regular-svg-icons';
import * as React from 'react';

export function Field<T extends DataEntryElement>({
    El,
    setValue,
    getValue,
    realm,
    isFieldSet,
    ...props
}: {
    El: React.FunctionComponent<{ realm: Realm; setValue: (ev: React.ChangeEvent<T>) => void; getValue: () => any; computedValue: any }>;
    setValue: (ev: React.ChangeEvent<T>) => void;
    getValue: () => any;
    computedValue?: any;
    isFieldSet?: boolean;
    realm: Realm;
    enumMap?: Record<string, string>;
} & Omit<IPropertyProps<T>, 'func'>) {
    const {
        displayName,
        name,
        propertyName,
        calculated,
        required,
        readOnly,
        disabled,
        hidden,
        kind,
        datatype,
        ordinal,
        icon,
        computedValue,
        enumMap,
        ...remain
    } = props;
    const $readonly = calculated || readOnly || datatype === 'uuid' || datatype === 'objectId';

    const className = useTheme({}, 'flex flex-col w-full relative', 'form', 'insert', 'field');
    const labelClassName = useTheme({}, '', 'form', 'insert', 'field', 'label');
    const controlClassName = useTheme(
        {
            'select-none': $readonly ?? false,
            'select-all': disabled ?? false,
            'cursor-not-allowed': disabled ?? false
        },
        '',
        'form',
        'insert',
        'field',
        'control'
    );
    const feedbackClassName = useTheme({}, '', 'form', 'insert', 'field', 'feedback');
    const { labelID, controlID, fieldID, feedbackID } = {
        labelID: `${propertyName}-control-label`,
        controlID: `${propertyName}-control`,
        fieldID: `${propertyName}-field`,
        feedbackID: `${propertyName}-control-feedback`
    };
    const spanClassName = useTheme(
        {
            ['w-0 h-0']: (!readOnly && !disabled) ?? false,
            ['bg-red-dark w-6 h-6']: (readOnly || disabled) ?? false
        },
        'absolute inset-y-0 right-0 flex-col items-center object-scale-down object-center flex text-white bg-transparent'
    );
    return (
        <div id={fieldID} className={className}>
            {!(isFieldSet ?? false) && (
                <label id={labelID} htmlFor={controlID} className={labelClassName}>
                    {displayName}
                    {(readOnly || disabled) ??
                        (false && (
                            <div className={spanClassName}>
                                {readOnly && (
                                    <span title='Item is read-only.'>
                                        <FontAwesomeIcon className='m-0.5 inline-flex' icon={faLock} size='sm' />
                                    </span>
                                )}
                                {disabled && (
                                    <span title='Item is disabled.'>
                                        {<span>{<FontAwesomeIcon className='m-0.5 inline-flex ' icon={faBan} size='sm' />}</span>}
                                    </span>
                                )}
                            </div>
                        ))}
                </label>
            )}
            <El
                {...props}
                realm={realm}
                computedValue={computedValue}
                aria-labelledby={labelID}
                id={controlID}
                readOnly={$readonly}
                className={controlClassName}
                getValue={getValue}
                setValue={setValue}
                datatype={datatype}
                kind={kind}
                name={name}
                enumMap={enumMap}
                data-datatype={datatype}
                data-kind={kind}
                data-name={name}
                data-enumMap={JSON.stringify(enumMap)}
            />
        </div>
    );
}
// export function Field<T extends DataEntryElement>({
//     setValue,
//     getValue,
//     ...props
// }: Omit<IPropertyProps<T>, 'func'> & {
//     computedValue?: string;
//     getValue: () => any;
//     setValue: (ev: React.ChangeEvent<HTMLInputElement>) => void;
// }) {

//             <input
//                 id={controlID}
//                 className={controlClassName}
//                 aria-labelledby={labelID}
//                 disabled={disabled}
//                 hidden={hidden}
//                 readOnly={$readonly}
//                 required={required}
//                 name={name}
//                 onChange={setValue}
//                 value={value}
//                 {...({ dataPropertyName: propertyName, dataKind: kind, dataDatatype: datatype } as any)}
//                 {...(remain as Partial<PropertyProps<HTMLInputElement>>)}
//             />
//         </div>
//     );
// }
