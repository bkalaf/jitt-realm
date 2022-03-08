import { useMemo } from 'react';
import { handleDisplayName } from '../util/handleDisplayName';
import { getID } from '@controls/SafeInputControl';

export function useControlIDs(name: string, display?: string) {
    const container = getID(name, 'field');
    const control = getID(name, 'field', 'control');
    const label = getID(name, 'field', 'label');
    const feedback = getID(name, 'field', 'feedback');
    return useMemo(
        () => ({
            container,
            control,
            label,
            feedback,
            displayName: handleDisplayName(name, display)
        }),
        [container, control, display, feedback, label, name]
    );
}
