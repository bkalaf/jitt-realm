import { SelfStorage } from '../selfStorage';
import { Address } from '../../../embedded/address';
import { ObjectId } from 'bson';

export type Facility = {
    _id: ObjectId;
    facilityNumber?: string;
    email?: string;
    phoneNumber?: string;
    address?: Address;
    selfStorage?: SelfStorage;
    get name(): string;
};
