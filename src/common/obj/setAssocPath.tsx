import { Logger } from "../../renderer/layout/Logger";

export function setAssocPath<T>(path: string, object: Record<string, any>, value: T): Record<string, any> {
    Logger.enter(`setAssocPath(${path}, ${JSON.stringify(object)}, ${JSON.stringify(value)})`);
    // if (path.includes('.')) {
    //     const [head, ...tail] = path.split('.');
    //     if (tail.length > 0) {
    //         return { ...object, [head]: setAssocPath(tail.join('.'), object[head], value) };
    //     }
    // }
    // const result = { ...object, [path]: value };
    // try {
    //     Logger.log(JSON.stringify(result));
    // } catch (error) {
    //     console.error(result);
    // }
    const copy: any = {};
    Object.getOwnPropertyNames(object).forEach(key => {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(object, key)!);
    });
    console.log('copied', Object.getOwnPropertyDescriptors(copy), copy);
    eval(`copy.${path} = value`);
    console.log('copied&set', Object.getOwnPropertyDescriptors(copy), copy);
    return copy;
}
