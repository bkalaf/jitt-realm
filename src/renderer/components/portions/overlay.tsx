import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../util/cn';

export function FullScreenOverlay() {
    const [content, setContent] = useState<JSX.Element[]>([]);
    const [hidden, setHidden] = useState(false);
    const context = useRef<Record<string, any> | null>(null);
    const pushContent = useCallback((item: JSX.Element) => {
        setHidden(false);
        setContent((prev) => [...prev, item]);
    }, []);
    const popContent = useCallback((state?: Record<string, any>) => {
        context.current = state ?? null;
        setContent((prev) => {
            const [h, ...t] = prev;
            return t;
        });
    }, []);
    const hasContent = useMemo(() => content.length > 0, [content]);
    const className = useMemo(() => cn(
        {
            'opacity-0': !hasContent,
            'opacity-100': hasContent,
            hidden: hidden
        },
        'flex items-center justify-center w-full h-full border-2 pointer-events-auto border-white/50 rounded-2xl bg-slate-dark/80 transition-all duration-1000 delay-150 ease-in-out'
    ), [hasContent, hidden]);
    const onTransitionEnd = useCallback(() => {
        if (content.length === 0) {
            setHidden(true);
        }
    }, [content]);
    useEffect(() => setHidden(true), []);
    useEffect(() => {
        global.pushContent = pushContent;
        global.popContent = popContent;
    }, [popContent, pushContent]);
    return (
        <div onTransitionEnd={onTransitionEnd} className={className}>
            {content.length > 0 ? content[0] : null}
        </div>
    );
}
