import { caps } from './caps';
import { splitAt } from './splitAt';
import { unletters } from './unletters';
import { isUpper, letters } from './toTitleCase';

export function camelToTitleCase(str: string) {
    const splitted = splitAt(isUpper)(letters(str)).map(unletters);
    return splitted.map(caps).join(' ');
}
