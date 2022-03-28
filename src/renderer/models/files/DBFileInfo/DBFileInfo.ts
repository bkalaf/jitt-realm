// DTO $dto$file$info

import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { Reflector } from '../..';
import { FileLocationObj } from '../../embedded/FileLocation/FileLocationObj';
import { ROUTES } from '../../junkyard-classes';
import { IDBFileInfo } from './IDBFileInfo';

const schema: ObjectSchema = {
    name: ROUTES.FILES.FILE_INFO,
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        id: 'int',
        createDate: 'date',
        data: 'data',
        hash: 'string',
        ids: 'string{}',
        isUnassigned: 'bool',
        itemType: 'string?',
        location: 'file-location',
        mimeType: 'string',
        modifiedDate: 'date',
        size: 'int',
        type: 'string?'
    }
};

export class DBFileInfo implements IDBFileInfo {
    static schema = schema;
    _id: ObjectId;
    id: number;
    createDate?: Date;
    data?: ArrayBuffer;
    hash?: string;
    ids: Record<string, string>;
    isUnassigned?: boolean; 
    itemType?: string;
    location?: FileLocationObj;
    mimeType?: string;
    modifiedDate?: Date; 
    size?: number;
    type?: string;
    constructor() {
        this._id = new ObjectId();
        this.id = Reflector.$()?.autoIncrement(ROUTES.FILES.FILE_INFO);
        this.ids = {};
    }
}