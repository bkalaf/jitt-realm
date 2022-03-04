import React from 'react';
import { ReactText } from 'react';
import { identity } from '../../common/identity';
import { objectMap } from '../../common/object/objectMap';

export const $$Elements: Record<string, (props: React.PropsWithChildren<any>, ref: React.ForwardedRef<HTMLElement>) => JSX.Element> = {
    fieldset: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <fieldset ref={ref as React.ForwardedRef<HTMLFieldSetElement>} {...remain}>
                {children}
            </fieldset>
        ) : (
            <fieldset {...remain}>{children}</fieldset>
        );
    },
    legend: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <legend ref={ref as React.ForwardedRef<HTMLLegendElement>} {...remain}>
                {children}
            </legend>
        ) : (
            <legend {...remain}>{children}</legend>
        );
    },
    label: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <label ref={ref as React.ForwardedRef<HTMLLabelElement>} {...remain}>
                {children}
            </label>
        ) : (
            <label {...remain}>{children}</label>
        );
    },
    div: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <div ref={ref as React.ForwardedRef<HTMLDivElement>} {...remain}>
                {children}
            </div>
        ) : (
            <div {...remain}>{children}</div>
        );
    },
    input: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <input ref={ref as React.ForwardedRef<HTMLInputElement>} {...remain}>
                {children}
            </input>
        ) : (
            <input {...remain}>{children}</input>
        );
    },
    select: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <select ref={ref as React.ForwardedRef<HTMLSelectElement>} {...remain}>
                {children}
            </select>
        ) : (
            <select {...remain}>{children}</select>
        );
    },
    textarea: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <textarea ref={ref as React.ForwardedRef<HTMLTextAreaElement>} {...remain}>
                {children}
            </textarea>
        ) : (
            <textarea {...remain}>{children}</textarea>
        );
    },
    small: ({ children, ref: _ref, ...remain }: { children?: Children; ref?: any }, ref?: React.ForwardedRef<HTMLElement>) => {
        return ref ? (
            <small ref={ref as React.ForwardedRef<HTMLElement>} {...remain}>
                {children}
            </small>
        ) : (
            <small {...remain}>{children}</small>
        );
    }
};

export const ForwardComponents: Record<
    keyof typeof $$Elements,
    React.ForwardRefExoticComponent<Pick<any, string | symbol | number> & React.RefAttributes<HTMLElement>>
> = objectMap($$Elements, identity, (x) => React.forwardRef(x));
