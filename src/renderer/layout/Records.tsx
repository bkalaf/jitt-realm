import { Toolbar } from './Toolbar';
import { Selectable } from './Window';
import '../db/index';
import { useRecordType } from '../hooks/useRecordType';
import { FormProvider } from '../db/FormProvider';
import React from 'react';

/**
 * @deprecated
 */
export function Records({
    realm,
    isInsert,
    isGrid,
    ...selectable
}: {
    isInsert: boolean;
    isGrid: boolean;
    realm: Realm;
} & Selectable) {
    const [type, Ctor] = useRecordType();

    const body = isGrid ? <></> : isInsert ? <FormProvider canSubmit realm={realm}></FormProvider> : <>Single</>;
    return (
        <div className='relative flex flex-col w-full h-full'>
            <Toolbar isInsert={isInsert} isGrid={isGrid} isSelectable={selectable.isSelectable} setSelectable={selectable.setSelectable} />
            {body}
        </div>
    );
}

export function PassThruComponent(props: { children?: Children; Component: React.FunctionComponent } & Record<string, any>) {
    const { Component, children, ...remain } = props;
    return <Component {...remain}>{children}</Component>;
}
