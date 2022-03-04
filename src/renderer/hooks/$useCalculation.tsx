import { $useSubscribe } from './$useSubscribe';
import { useForm } from './useForm';

/**
 * 
 * @param calculation 
 * @author REK
 */
export function $useCalculation(calculation: string) {
    const { subscribeCalculation, unsubscribeCalculation } = useForm();
    $useSubscribe(subscribeCalculation, unsubscribeCalculation, calculation);
}
