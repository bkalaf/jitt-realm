import { ObjectClass, ObjectSchema } from 'realm';
import { RealmObjectKinds } from './junkyard-classes/LinkedObject';
import orm from './../orm.json';
export const API_KEY = 'WxW78xvWytfvVr1vB9dC4ZGgzGWrCNPsh70LoHr21p0s1337YKNsqigCIQBi5eSO';

// export class AutoIncrementer {
//     private static instance: AutoIncrementer;
//     private realm: Realm;
//     private user: Realm.User | undefined;
//     private ids: Realm.Object & IIdentity;
//     public async autoIncr(name: string) {
//         return await this.user?.mongoClient('Cluster0').db('app-admin').collection('identity').findOneAndUpdate({ name: 'identity' }, { $inc: { value: 1 } }, { upsert: true, projection: { value: 1 }}) as { value: number };
//     }
//     private constructor(realm: Realm) {
//         this.realm = realm;
//         Realm.App.getApp(config.realm.appID).logIn(Realm.Credentials.anonymous()).then(u => this.user = u);

//         const autoincrement = (name: string) => Realm.App.getApp('').logIn(Realm.Credentials.anonymous()).then(a => {
//             a.mongoClient('Cluster0').db('app-admin').collection('identity').findOneAndUpdate({ name: 'identity' }, { $inc: { value: 1 } }, { upsert: true, projection: { value: 1 }});
//         });
//         const result = realm.objects<Identity>('identity');
//         result.addListener((cc, cset) => {
//             console.log(`changed: identity: ${cc.length}`);
//             console.log(`insertions: \n\t${cset.insertions.map(x => x.toString()).join('\n\t')}`);
//             console.log(`deletions: \n\t${cset.deletions.map(x => x.toString()).join('\n\t')}`);
//             console.log(`newModifications: \n\t${cset.newModifications.map(x => x.toString()).join('\n\t')}`);
//             console.log(`oldModifications: \n\t${cset.oldModifications.map(x => x.toString()).join('\n\t')}`);
//         });
//         if (result.length === 0) {
//             console.log('query was length 0');
//             realm.write(() => {
//                 const item = new Identity();
//                 item.ids.set({ identity: 0 });
//                 realm.create('identity', item);
//             });
//         }
//         console.log(`result: `, result);
//         this.ids = realm.objects<Identity>('identity')[0];
//         console.log(this.ids);
//         this.ids.addListener((cc: Realm.Object, cset: ObjectChangeSet) => {
//             console.log(`changed properties: \n\t${cset.changedProperties.join('\n\t')}`);
//             console.log(`is deleted: ${cset.deleted.toString()}`);
//         });
//         this.test();
//     }
//     public increment(name: string) {
//         const current = this.ids.ids[name];
//         const next = current ? current + 1 : 0;
//         this.realm.write(() => {
//             if (current == null) {
//                 this.ids.ids.set({ [name]: next });
//             } else {
//                 (this.ids.ids as any).put(name, next);
//             }
//         });
//         return next;
//     }
//     private test() {
//         const autoid = this.increment('self-storage');
//         console.log(`autoID: ${autoid}`);
//     }
//     public static Get(realm: Realm) {
//         if (AutoIncrementer.instance == null) {
//             AutoIncrementer.instance = new AutoIncrementer(realm);
//         }
//         return AutoIncrementer.instance;
//     }
// }

export * from './models';

export function $getNext(realm: Realm) {
    return (name: string) => {
        const id = realm.objects(name).max('id') as number;
        return id + 1;
    };
}
export class Reflector {
    private static instance: Reflector;
    private realm: Realm;
    private schema: Map<string, ObjectClass>;
    private objSchema: Map<string, ObjectSchema>;
    private types: Map<string, RealmObjectKinds>;
    public autoIncrementer: (name: string) => number;
    private constructor(realm: Realm, schema: ObjectClass[]) {
        this.realm = realm;
        this.schema = new Map(schema.map((x) => [x.schema.name, x] as [string, ObjectClass]));
        this.objSchema = new Map(realm.schema.map((x) => [x.name, x]));
        this.types = new Map(
            Object.entries(orm).map(([k, v]) => {
                const { fields, ...remain } = v;
                return [k, { ...this.objSchema.get(k), ...remain, fields: new Map(Object.entries(fields)) }];
            })
        ) as any;
        this.autoIncrementer = $getNext(realm);
    }
    static $() { return Reflector.instance; }
    autoIncrement(name: string): number {
        if (this.autoIncrementer == null) {
            console.log('autoIncrement not ready');
            return 0;
        }
        return this.autoIncrementer(name);
    }
    public static Get(realm: Realm, schema: ObjectClass[]): Reflector {
        if (Reflector.instance == null) {
            Reflector.instance = new Reflector(realm, schema);
        }
        return Reflector.instance;
    }
    getObjectClass(type: string): ObjectClass {
        const result = this.schema.get(type);
        if (result == null) throw new Error(`type: ${type} did not have an ObjectClass`);
        return result;
    }
    getTypeInfo(type: string) {
        if (this.types == null) {
            console.error('getTypeInfo not ready');
            return undefined as any;
        }
        const result = this.types.get(type)!;
        if (result == null) throw new Error(`type: ${type} did not have an ITypeInfo`);
        return result;
    }
    getFieldInfo(type: string, colName: string) {
        return this.getTypeInfo(type).properties[colName];
    }
}
