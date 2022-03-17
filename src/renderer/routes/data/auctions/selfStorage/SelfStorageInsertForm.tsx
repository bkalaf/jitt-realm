import * as BSON from 'bson';

export const selfStorageInitial = (): any => {
    const result = {} as any;
    result._id = new BSON.ObjectId().toHexString();
    result.name = '';
    result.website = '';
    result.facilities = [];
    console.log(`selfStorageInitial`, result);
    return result;
};

export function selfStorageConvertIn(ss: any) {
    return {
        _id: new BSON.ObjectId(ss._id),
        name: ss.name,
        website: ss.website
    };
}
