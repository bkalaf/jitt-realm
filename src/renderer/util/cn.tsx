import { unique } from '../../common/array/unique';

export function cn(flags: ClassNameFlags, baseName = '') {
    const truthy = Object.entries(flags)
        .filter(([k, v]) => v)
        .map(([k, v]) => k);
    const falsy = Object.entries(flags)
        .filter(([k, v]) => !v)
        .map(([k, v]) => k);
    const remain = unique(baseName.split(' ').concat(truthy)).filter((x) => !falsy.includes(x));
    return remain.join(' ');
}
