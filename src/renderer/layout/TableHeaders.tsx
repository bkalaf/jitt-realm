import { $$schemaOC, Reflector } from '../models';
import { ITypeInfo } from '../models/junkyard-classes/LinkedObject';

export function TableHeaders({ typeInfo, realm }: { typeInfo: ITypeInfo<false, "_id">, realm: Realm }) {
    Reflector.Get(realm, $$schemaOC).getTypeInfo
}