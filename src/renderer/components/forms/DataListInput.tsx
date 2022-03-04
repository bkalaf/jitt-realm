import * as React from 'react';
import { Boundary } from '../Boundary';
import { useGetDataList } from '../../hooks/useGetDataList';

// TODO Remove this
export function DataListInput<T>({
    // list,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    getValue?: GetValue<T>;
    setValue?: SetValue<T, HTMLInputElement>;
    labelID?: string;
    convert?: (x: string) => T;
    stringify?: (x: T) => string;
    list: string;
}) {
    const DataList = useGetDataList(props.list);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            {DataList}
            {/* <InputControl list={list} {...props} /> */}
        </Boundary>
    );
}
