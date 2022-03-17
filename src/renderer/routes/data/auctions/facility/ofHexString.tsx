import { ObjectId } from 'bson';

export function ofHexString(x: string) {
    return new ObjectId(x);
}
