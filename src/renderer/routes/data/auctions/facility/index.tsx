/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { replaceAll } from '../../../../../common/text/replaceAll';
import { ObjectId } from 'bson';
import { lookupObject } from './lookupObject';
import { $$datatypes, $$names } from '../../../controls/constants';
const Registrar = JITTRegistrar;

export class FacilityDTO {
    static schema: Realm.ObjectSchema = {
        name: $$names.auctions.facility,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            selfStorage: {
                type: $$names.auctions.selfStorage,
                optional: true
            },
            facilityNumber: $$datatypes.opt.string,
            address: {
                type: $$names.embedded.address
            },
            email: $$datatypes.opt.string,
            phoneNumber: $$datatypes.opt.string
        }
    };
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

export const facilityInitial = () => {
    // const result: Facility = {
    //     _id: new ObjectId(),
    //     phoneNumber: '',
    //     email: '',
    //     address: {
    //         street: '',
    //         suite: '',
    //         city: '',
    //         state: 'CA' as Provinces,
    //         country: 'US' as CountryISO2,
    //         postal: ''
    //     },
    //     facilityNumber: '',
    //     selfStorage: undefined as SelfStorage | undefined
    // } as any;
    //
    // console.log(`result: `, result);
    // console.log(`facility.name: `, result.name);
    // return result;
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
