import { ObjectSchema } from "realm";
import { $_id, AUDIT, JTT, ObjectId } from "../../junkyard-classes";

export interface IDBAudit {
    _id: any;
    id: number;
    table: string;
    pk: number;
    field: string;
    oldValue?: string;
    newValue?: string;
    timestamp: number;
    user?: string;
}
