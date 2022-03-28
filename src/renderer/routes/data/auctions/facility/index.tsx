/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { replaceAll } from '../../../../../common/text/replaceAll';
import { ObjectId } from 'bson';
import { lookupObject } from './lookupObject';
import { $$datatypes, $$names } from '../../../controls/constants';
import { createInit } from './createInit';
import { IDTO } from './IDTO';
const Registrar = JITTRegistrar;

export class FacilityDTO {
    static schema: Realm.ObjectSchema = {
        name: $$names.auctions.facility,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            id: $$datatypes.int,
            selfStorage: $$names.auctions.selfStorage,
            facilityNumber: $$datatypes.opt.string,
            address: {
                type: $$names.embedded.address
            },
            email: $$datatypes.opt.string,
            phoneNumber: $$datatypes.opt.string
        }
    };
    constructor() {
        console.log(`THIS`, this);
        const d: any = this as any;
        d.email = '';
        d.phoneNumber = '';
        d.facilityNumber = '';
        d.address = createInit('address');
        d._id = new ObjectId();
        console.log('THIS', d);
    }
    
    get name() {
        const dto = this as any;
        return `${dto.selfStorage?.name ?? ''} - ${dto.address?.city ?? ''}, ${dto.address?.state ?? ''} - ${dto.address?.street?.split(' ').slice(1).join(' ') ?? ''}`;
    }
}

export const facilityConvertIn = (obj: any, realm?: Realm) => {
    return {
        _id: new ObjectId(obj._id),
        phoneNumber: obj.phoneNumber,
        email: obj.email,
        facilityNumber: obj.facilityNumber,
        address: Registrar.getConvert($$names.embedded.address)(obj.address),
        selfStorage: lookupObject(realm!, $$names.auctions.selfStorage)(obj.selfStorage)
    };
};

export function compR<T, U, V>(f: (x: T) => U, g: (x: U) => V) {
    return (x: T) => g(f(x));
}

export type AnyFunction = (...args: any[]) => any;
// export function compManyR<F extends AnyFunction, T extends any[]>(...funcs: T) {
//     return function<T>(x: T[0]) {
//         return funcs.reduce(compR as any, x) as ReturnType<Parameters<F>[OneLess<Parameters<F>>]>;
//     }
// }

function compManyR(...funcs: any[]) {
    return (x: any) => funcs.reduce(compR, x);
}
export const parseTel = compManyR(replaceAll('-', ''), replaceAll('(', ''), replaceAll(')', ''), replaceAll(' ', ''));
