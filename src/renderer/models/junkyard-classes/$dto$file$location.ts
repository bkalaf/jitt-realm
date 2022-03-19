import path from 'path';
import { ObjectSchema } from 'realm';
import { replaceAll } from '../../../common/text/replaceAll';
import config from './../../../../config.json';

const schema = {
    name: 'file-location',
    embedded: true,
    properties: {
        drive: 'string?',
        filename: 'string',
        folder: 'string'
    }
};

export class $dto$file$location {
    static schema: ObjectSchema = schema;
    public drive?: string;
    public folder: string;
    public filename: string;
    constructor(filename = '', folder = '', drive?: string | undefined) {
        this.drive = drive;
        this.folder = folder;
        this.filename = filename;
    }
    static Of(fullname: string) {
        return new $dto$file$location(path.basename(fullname), replaceAll(config.files.root, '')(path.dirname(fullname)), '/');
    }
}
