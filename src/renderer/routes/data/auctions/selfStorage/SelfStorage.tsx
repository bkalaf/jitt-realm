import { ObjectId } from 'bson';

export type SelfStorage = {
    _id: ObjectId;
    name: string;
    website?: string;
    facilities: Realm.Object[];
};
