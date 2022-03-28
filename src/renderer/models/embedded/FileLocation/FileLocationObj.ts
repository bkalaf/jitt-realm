import * as path from 'path';
import { ObjectSchema } from 'realm';
import { ROUTES } from '../../junkyard-classes';
import { replaceAll } from '../../../../common/text/replaceAll';
import config from '../../../../../config.json';

const schema = {
    name: ROUTES.$.FILE_LOCATION,
    embedded: true,
    properties: {
        drive: { type: 'string', default: '/' },
        filename: { type: 'string', default: '' },
        folder: { type: 'string', default: '' }
    }
};

// DTO db.$.file-location
export class FileLocationObj {
    static schema: ObjectSchema = schema;
    public drive: string;
    public folder: string;
    public filename: string;
    constructor(filename = '', folder = '', drive = '/') {
        this.drive = drive;
        this.folder = folder;
        this.filename = filename;
    }
    static Of(fullname: string) {
        return new FileLocationObj(path.basename(fullname), replaceAll(config.files.root, '')(path.dirname(fullname)), '/');
    }
}
