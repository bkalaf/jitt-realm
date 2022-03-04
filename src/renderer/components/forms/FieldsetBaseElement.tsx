import React from 'react';
import { useTheme } from '../../providers/useTheme';

export function FieldsetBaseElement({ children, name }: { name: string; children?: Children }) {
    const className = useTheme({}, '', 'form', 'insert', 'fieldset');
    return React.createElement('fieldset', { id: `${name}-fieldset`, className }, children);
}
