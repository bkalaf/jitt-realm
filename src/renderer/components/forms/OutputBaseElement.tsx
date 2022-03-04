import React from 'react';
import { useForm2 } from '../../hooks/useForm2';

export function OutputBaseElement({ name, calc, htmlFor }: { name: string; calc: string; htmlFor: string }) {
    const { subscribeCalculation } = useForm2();
    React.useEffect(() => {
        subscribeCalculation(calc);
    });
    return React.createElement('output', { htmlFor, name, 'data-name': name, id: `${name}-output`, 'data-id': `${name}-output` });
}
