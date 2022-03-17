import React from 'react';
import { Boundary } from '../../../components/suspense/Boundary';

export function Bound({ children }: { children?: Children }) {
    return <Boundary fallback={<div>Loading...</div>}>{children}</Boundary>;
}
