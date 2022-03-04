import { Logger } from "../../renderer/layout/Logger";

export function setAssocPath<T>(path: string, object: Record<string, any>, value: T): Record<string, any> {
    Logger.enter(`setAssocPath(${path}, ${object}, ${value})`)
    if (path.includes('.')) {
        const [head, ...tail] = path.split('.');
        if (tail.length > 0) {
            return { ...object, [head]: setAssocPath(tail.join('.'), object[head], value) };
        }
    }
    const result = { ...object, [path]: value };
    Logger.log(JSON.stringify(result));
    return { ...object, [path]: value };
}
