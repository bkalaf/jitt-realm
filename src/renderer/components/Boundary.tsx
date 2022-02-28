import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export function Boundary({ children, fallback }: { children: Children; fallback: React.ReactElement }) {
    return (
        <ErrorBoundary>
            <React.Suspense fallback={fallback}>{children}</React.Suspense>
        </ErrorBoundary>
    );
}
