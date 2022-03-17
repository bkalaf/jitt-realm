
export function getID(name: string, ...segments: string[]) {
    return [name, ...segments].join('-');
}
