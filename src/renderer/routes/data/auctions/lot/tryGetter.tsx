import { Result } from '../../../../hooks/$useControl';
import { isEmptyOrNull } from './asPercentage';
import { wrapTry } from './wrapTry';

// export function tryGetter<T, TElement extends DataEntryElement>(getter: () => T, stringify: (x: T) => string) {
//     return function () {
//         const func = wrapTry(stringify);
//         if (ref.current == null) {
//             alert('tryGetter null ref');
//             return;
//         }
//         if (!isEmptyOrNull(temp))
//             return temp;
//         const result = func(getter());
//         if (Result.isPass(result)) {
//             return result.value ?? '';
//         }
//         return 'ERROR';
//     };
// }
