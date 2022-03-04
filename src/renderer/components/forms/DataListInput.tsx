import * as React from 'react';
import { InputControl } from './InputControl';
import { Boundary } from '../Boundary';
import { useGetDataList } from '../../hooks/useGetDataList';
import { IDataListContext } from '../../providers/DataListContext';

// TODO Remove this
export function DataListInput<T>({
    list,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    getValue?: GetValue<T>;
    setValue?: SetValue<T, HTMLInputElement>;
    labelID?: string;
    convert?: (x: string) => T;
    stringify?: (x: T) => string;
    list: keyof IDataListContext;
}) {
    const DataList = useGetDataList(list);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            {DataList}
            <InputControl list={list} {...props} />
        </Boundary>
    );
}
