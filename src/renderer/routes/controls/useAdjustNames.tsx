import { useContext } from 'react';
import { camelToTitleCase } from '../../../common/text/camelToTitleCase';
import { replaceAll } from '../../../common/text/replaceAll';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { EmbeddedContext } from '../forms/InsertFormProvider';

export function useAdjustNames(name: string, display?: string) {
    const { prefix } = useContext(EmbeddedContext)!;
    const displayName = display ? display : name.includes('-') ? toTitleCase(replaceAll('-', ' ')(name)) : camelToTitleCase(name);
    const fullName = [...prefix, name].join('.');
    const kebabName = replaceAll('.', '-')(fullName);
    return {
        displayName,
        fullName,
        name,
        fieldID: `${kebabName}-field`,
        controlID: `${kebabName}-field-control`,
        labelID: `${kebabName}-field-label`,
        feedbackID: `${kebabName}-field-feedback`,
        fieldsetID: `${kebabName}-fieldset`,
        legendID: `${kebabName}-legend`,
        outputID: `${kebabName}-field-output`
    };
}
