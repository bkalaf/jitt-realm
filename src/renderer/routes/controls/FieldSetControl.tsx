import { AddEmbeddedStack } from '../providers/EmbeddedContext/index';
import { useEmbedded } from '../../hooks/useEmbedded';
import { ObjectSchemaProperty } from 'realm';
import { useMinimalControl } from "../../hooks/useMinimalControl";
import { cloneElement, ReactElement } from 'react';
import { isEmptyOrNull } from '../../util/asPercentage';

export function FieldSetControl({ name: $name, display, formName, ...remain }: { name: string; display?: string, formName?: string  }) {
    console.log('FIELD SET CONTROL');
    const { prefix, type, realm } = useEmbedded();
    const t = realm.schema.filter(x => x.name === type)[0];
    const p = t.properties[$name] as ObjectSchemaProperty;
    console.log(`t`, t, `p`, p);
    if (p.type !== 'object') throw new Error(`bad type: ${p.type}`);
    const { objectType } = p;
    const { displayName, fullName, toID } = useMinimalControl(formName ?? '', $name, display);
    console.log(`objectType`, objectType);
    const newType = objectType;
    if (isEmptyOrNull(newType)) throw new Error(`bad objectType: ${newType ?? ''}`);
    const children = JITTRegistrar.getChildren(newType);
    return (
        <fieldset name={fullName} id={toID('fieldset')} aria-labelledby={toID('legend')}>
            <legend id={toID('legend')}>{displayName}</legend>
            <AddEmbeddedStack name={$name} type={newType ?? 'n/a'}>
                {React.Children.toArray(children).map((x, ix) => cloneElement(x as ReactElement, { ...(x as ReactElement).props, formName, ...remain, key: ix }))}
            </AddEmbeddedStack>
        </fieldset>
    );
}
