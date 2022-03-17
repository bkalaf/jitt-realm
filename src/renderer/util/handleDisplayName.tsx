import { isUpper } from '../../common/text/toTitleCase';
import { splitAt } from '../../common/text/splitAt';
import { unletters } from '../../common/text/unletters';
import { caps } from '../../common/text/caps';

export function handleDisplayName(name: string, display?: string) {
    return display
        ? display
        : splitAt((x) => isUpper(x) || x === '.' || x === '-')(name.split(''))
              .map(unletters)
              .map(caps)
              .join(' ');
}
