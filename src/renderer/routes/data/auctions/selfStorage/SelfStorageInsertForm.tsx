import { SelfStorage } from '.';
import * as BSON from 'bson';
import { isEmptyOrNull } from '../../../../util/asPercentage';

export const selfStorageInitial = (): SelfStorage => {
    const result = {} as any;
    result._id = new BSON.ObjectId().toHexString();
    result.name = '';
    result.website = '';
    result.facilities = [];
    console.log(`selfStorageInitial`, result);
    return result;
};

export function selfStorageConvertIn(ss: any) {
    return {
        _id: new BSON.ObjectId(ss._id),
        name: ss.name,
        website: ss.website
    };
}

export function setProperty(name: string, obj: Record<string, any>, value: any): any {
    if (name == null || name.length === 0) return value;
    if (!name.includes('.')) {
        return { ...obj, [name]: value };
    }
    const [head, ...tail] = name.split('.');
    return { ...obj, [head]: setProperty(tail.join('.'), obj[head], value) };
}

console.log(setProperty('name', { name: 'one' }, 'bob'));
console.log(setProperty('company.name', { name: 'one' }, 'bob'));
console.log(setProperty('name.name', { name: { name: 'bill', age: 13 } }, 'bob'));

export function getProperty(name: string, obj: Record<string, any> = {}): any {
    if (name == null || name.length === 0) return obj;
    if (!name.includes('.')) {
        return obj[name];
    }
    const [head, ...tail] = name.split('.');
    return getProperty(tail.join('.'), obj[head]);
}

console.log(getProperty('name', { name: 'one' }));
console.log(getProperty('company.name', { name: 'one' }));
console.log(getProperty('name.age', { name: { name: 'bill', age: 13 } }));
console.log(getProperty('name', { name: { name: 'bill', age: 13 } }));
