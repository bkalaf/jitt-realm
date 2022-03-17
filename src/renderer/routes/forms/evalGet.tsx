export function checkName(s: string) {
    if (s.includes('-')) {
        return ['["', s, '"]'].join('');
    }
    return ['.', s].join('');
}
/**
 * @deprecated
 */
export function evalGet<T>(formData: T, name: string) {
    const n = name.split('.').map(checkName).join('');
    console.log(`evalGet`, `formData`, formData, `name`, n, name, `script: formData${n}`);
    return eval(`formData${n}`);
}
