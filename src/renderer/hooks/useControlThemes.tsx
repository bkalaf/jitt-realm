import { useMemo } from 'react';
import { $useThemeClassNames } from '../db/SelfStorage';

export function useControlThemes() {
    const input = $useThemeClassNames('control');
    const container = $useThemeClassNames('container');
    const label = $useThemeClassNames('label');
    const feedback = $useThemeClassNames('feedback');
    return useMemo(
        () => ({
            input,
            container,
            label,
            feedback
        }),
        [container, feedback, input, label]
    );
}
