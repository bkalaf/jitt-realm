import { ObjectId } from 'bson';
import { Address } from '../../../embedded/Address';

export type Facility = {
    _id: ObjectId;
    facilityNumber?: string;
    email?: string;
    phoneNumber?: string;
    address?: Address;
    selfStorage?: Realm.Object;
    get name(): string;
};
