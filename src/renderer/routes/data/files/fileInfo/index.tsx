import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { $$names } from '../../../controls';
import { Lot } from '../../auctions/lot';
import { FileLocation } from './fileLocation';

export type Dictionary<T> =  {
    put(objs: Record<string, T>): void;
} & Record<string, T>;

type FileItemType = 'invoice' | 'photo' | 'receipt' | 'document' | 'label';

export type FileInfo = {
    _id: ObjectId;
    size: number;
    createDate: Date;
    modifiedDate: Date;
    hash: string;
    mimeType: string;
    get fileType(): string;
    itemType: FileItemType;
    ids: Dictionary<string>
    isUnassigned: boolean;
};

export type File$ = {
    location: FileLocation;
    data: ArrayBuffer;
    get toUri(): string;
    lotId?: Lot;
} & FileInfo;

export class FileDTO {
    static schema: ObjectSchema = {
        name: $$names.files.file,
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            size: 'int',
            createDate: 'date',
            modifiedDate: 'date',
            hash: 'string',
            mimeType: 'string',
            itemType: 'string?',
            location: $$names.embedded.fileLocation,
            data: 'data',
            ids: 'string{}',
            isUnassigned: 'bool',
            lotId: {
                type: 'linkingObjects',
                objectType: $$names.auctions.lot,
                property: 'invoice'
            }
        }
    };
    get toUri() {
        const dto = this as any as File$;
        return [dto.location.folder, dto.location.filename].join('/');
    }
}

export const initial = () => {
    const dto = {} as File$;
    dto._id = new ObjectId();
    dto.location = JITTRegistrar.getInitial($$names.embedded.fileLocation)();
    Object.defineProperty(dto, 'toUri', {
        get: function (this: File$) {
            return [this.location.drive, this.location.folder, this.location.filename].join('/');
        }
    });
    return dto;
};

export type Photo = {
    item: object;
    location: FileLocation;
    type: 'photo';
    original?: Photo;
    linkedTo: Photo[];
    get isOriginal(): boolean;
} & FileInfo;
