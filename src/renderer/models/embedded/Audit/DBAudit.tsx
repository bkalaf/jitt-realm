import { ObjectSchema } from 'realm';
import { $_id, AUDIT, JTT, ObjectId } from '../../junkyard-classes';

const schema: ObjectSchema = {
    name: JTT.AUDIT,
    primaryKey: $_id,
    properties: {
        _id: JTT.objectId,
        id: JTT.int, 
        table: JTT.string,
        pk: JTT.int,
        field: JTT.string,
        oldValue: JTT.opt.string,
        newValue: JTT.opt.string,
        timestamp: JTT.int,
        user: JTT.opt.string
    }
};


export type $insert = 'insert';
export const $insert: $insert = 'insert';
export type $update = 'update';
export const $update: $update = 'update';
export type $delete = 'delete';
export const $delete: $delete = 'delete';

export type AuditOperation = $insert | $update | $delete;
export class DBAudit {
    static schema = schema;
    _id: ObjectId;
    table: string;
    pk?: ObjectId;
    field: string;
    value?: string;
    operation?: AuditOperation;
    timestamp: number;
    user?: string;
    constructor(operation: AuditOperation = $insert, _id: ObjectId = new ObjectId(), pk?: ObjectId, field?: string, table?: string, value?: any, user?: string) {
        this._id = _id;
        this.timestamp = Date.now();
        this.pk = pk;
        this.field = field ?? 'unknown';
        this.table = table ?? 'unknown';
        this.value = JSON.stringify(value ?? 'undefined');
        this.user = user;
        this.operation = operation;
    }
}