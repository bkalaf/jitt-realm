import Realm from 'realm';
import { toTitleCase } from '../../common/text/toTitleCase';
import { generateRandomString } from '../../common/text/generateRandomString';
import React from 'react';

export function InsertFormFields({ children, prefix, realm, saveOnBlur }: { prefix?: string; children?: Children; saveOnBlur?: boolean; realm: Realm }) {
    return (
        <InsertFormFields realm={realm}>
            {React.Children.toArray(children).map((x, ix) => {
                const el: React.ReactElement = x as any;
                const { name, display, ...remain } = el.props;
                return React.cloneElement(el, {
                    ...remain,
                    key: `${(name as string) ?? generateRandomString(24)}-${ix}`,
                    saveOnBlur,
                    realm: realm,
                    name: [prefix, name].filter((x) => x != null).join('.'),
                    display: display ?? toTitleCase(name)
                });
            })}
        </InsertFormFields>
    );
}
