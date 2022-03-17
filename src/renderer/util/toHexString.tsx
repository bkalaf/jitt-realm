import { ObjectId } from 'bson';

export function toHexString(o: { _id: ObjectId }) {
    return o == null ? '' : o._id.toHexString();
}
