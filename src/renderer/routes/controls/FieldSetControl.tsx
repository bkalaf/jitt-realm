import { AddEmbeddedStack } from '../providers/EmbeddedContext';
import { useEmbedded } from '../../hooks/useEmbedded';
import { ObjectSchemaProperty } from 'realm';
import { useMinimalControl } from './useControl';
import { $reference } from '../../layout/references';
import { cloneElement, ReactElement } from 'react';

export function FieldSetControl({ name: $name, display, formName, ...remain }: { name: string; display?: string, formName?: string  }) {
    const { prefix, type, realm } = useEmbedded();
    const t = realm.schema.filter(x => x.name === type)[0];
    const p = t.properties[$name] as ObjectSchemaProperty;
    if (p.type !== 'object') throw new Error(`bad type: ${p.type}`);
    const { objectType } = p;
    const { displayName, fullName, toID } = useMinimalControl(formName ?? '', $name, display);
    const newType = objectType;
    const children = $reference[newType ?? 'n/a'].children;
    return (
        <fieldset name={fullName} id={toID('fieldset')} aria-labelledby={toID('legend')}>
            <legend id={toID('legend')}>{displayName}</legend>
            <AddEmbeddedStack name={$name} type={newType ?? 'n/a'}>
                {React.Children.toArray(children).map((x, ix) => cloneElement(x as ReactElement, { ...(x as ReactElement).props, ...remain, key: ix }))}
            </AddEmbeddedStack>
        </fieldset>
    );
}
