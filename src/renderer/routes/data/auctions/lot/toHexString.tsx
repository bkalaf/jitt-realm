import { ObjectId } from '@controls/index';

export function toHexString(o: { _id: ObjectId }) {
    return o == null ? '' : o._id.toHexString();
}
