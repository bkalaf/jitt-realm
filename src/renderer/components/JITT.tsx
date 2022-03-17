import * as React from 'react';

export const BaseEl = function <TElement extends HTMLElement>(tagName: 'div' | 'span' | 'input' | 'select') {
    return React.forwardRef(({ children, ...remain }: { children?: Children } & React.ComponentPropsWithoutRef<typeof tagName>, ref: React.ForwardedRef<HTMLElement>) =>
        React.createElement(tagName, { ...remain, ref }, children)
    );
};
