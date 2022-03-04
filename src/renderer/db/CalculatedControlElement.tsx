import { useForm2 } from '../hooks/useForm2';

export function CalculatedControlElement<TFormData>({ name, deps, calc }: { name: string; deps: string[]; calc: string }) {
    const { subscribeCalculation } = useForm2();
    React.useEffect(() => {
        return subscribeCalculation(calc);
    }, []);
    return (
        <output
            className='font-bold text-black border black bg-white/50 font-base font-patrickHand'
            id={`${name}-output`}
            name={name}
            htmlFor={deps.join(' ')}></output>
    );
}
