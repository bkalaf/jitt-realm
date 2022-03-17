import React from 'react';

export function LabelBaseElement({ children, name, controlID, labelID }: { name: string; controlID: string; labelID: string; children?: Children }) {
    return React.createElement('label', { name, id: labelID, htmlFor: controlID }, children);
}
