import { useForm } from './useForm';
import { useSubscribe } from './$useSubscribe';

/**
 * 
 * @param calculation 
 * @author REK
 */
export function $useCalculation(calculation: string) {
    const { subscribeCalculation, unsubscribeCalculation } = useForm();
    useSubscribe(subscribeCalculation, unsubscribeCalculation, calculation);
}
