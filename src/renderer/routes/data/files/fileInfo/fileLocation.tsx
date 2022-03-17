import { ObjectSchema } from 'realm';
import { $$names } from '../../../controls';

export type FileLocation = {
    drive: string;
    folder: string;
    filename: string;
    get extension(): string;
};

export class FileLocationDTO {
    static schema: ObjectSchema = {
        name: $$names.embedded.fileLocation,
        embedded: true,
        properties: {
            drive: 'string?',
            folder: 'string',
            filename: 'string'
        }
    };
}

export const fileLocationInitial = () => {
    const result = {} as FileLocation;
    result.folder = '';
    // eslint-disable-next-line no-unused-expressions
    (result.filename = ''),
        Object.defineProperty(result, 'extension', {
            get: function (this: FileLocation) {
                return this.filename.includes('.') ? this.filename.split('.')[1] : '';
            }
        });
    return result;
};

export const fileLocationConvertIn = (obj: any) => {
    return obj;
};

export function FileLocationHeaders() {
    return (
        <>
            <th>Drive</th>
            <th>Folder</th>
            <th>Filename</th>
            <th>Extension</th>
        </>
    );
}

export function FileLocationRow({ data }: { data: Realm.Object & FileLocation; index: number; typeName: string }) {
    return (
        <>
            <td>{data.drive}</td>
            <td>{data.folder}</td>
            <td>{data.filename}</td>
            <td>{data.extension}</td>
        </>
    );
}
