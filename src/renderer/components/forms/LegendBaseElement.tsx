import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export function LegendBaseElement({ label, name, id }: { name: string; label: string; id: string }) {
    const className = useTheme({}, '', 'form', 'insert', 'fieldset', 'legend');
    return React.createElement('legend', { className, id: `${name}-legend`, name }, label);
}
