
export type OneLess<T extends any[]> = ((...args: T) => any) extends (head: any, ...tail: infer R) => any ? R['length'] : 0;
