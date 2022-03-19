import { ObjectSchema } from 'realm';
import { CountryISO2 } from '../../../db/enums/CountryISO2';
import { $$datatypes, $$names, ObjectId } from '../../controls';

export type Brand = {
    _id: ObjectId;
    country: CountryISO2;
    name: string;
    aliases: string[];
    parent?: Brand;
    childs: Brand[];
};
export class BrandDTO {
    static schema: ObjectSchema = {
        name: $$names.products.brands,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            name: $$datatypes.string,
            country: $$datatypes.string,
            aliases: $$datatypes.list.string,
            parent: $$names.products.brands,
            childs: {
                type: $$datatypes.linkingObjects,
                objectType: $$names.products.brands,
                property: 'parent'
            }
        }
    };
}
