import Realm from 'realm';
import config from './../../../config.json';
import { useAsyncResource } from '../hooks/useAsyncResource';
import { useEffect, useMemo, useRef } from 'react';
import { useConnectivityStatus } from '../hooks/useConnectivityStatus';
import { $$schemaOC, Reflector } from '../models';
import { createReflection } from '../reflection/Reflection';

function createRealm(app: Realm.App, credentials: string, isConnected: boolean): Promise<Realm> {
    try {
        if (isConnected) {
            return app.logIn(eval(credentials)).then((user) =>
                Realm.open({
                    schema: $$schemaOC,
                    path: config.realm.localRealmPath,
                    sync: {
                        user: user,
                        partitionValue: config.realm.partitionValue
                        // existingRealmFileBehavior: {
                        //     type: Realm.OpenRealmBehaviorType.,
                        //     timeOutBehavior: Realm.OpenRealmTimeOutBehavior.OpenLocalRealm,
                        //     timeOut: 15000
                        // },
                        // newRealmFileBehavior: {
                        //     type: Realm.OpenRealmBehaviorType.DownloadBeforeOpen,
                        //     timeOutBehavior: Realm.OpenRealmTimeOutBehavior.ThrowException,
                        //     timeOut: 15000
                        // }
                    }
                })
            );
        }
        const r = Realm.open({
            schema: $$schemaOC,
            path: config.realm.localRealmPath
        }).then((realm) => {
            (global as any).Reflector = Reflector.Get(realm, $$schemaOC);
            console.log('GlobalThis');
            console.log(((global as any).Reflector == null).toString());
            (global as any).realm = realm;
            console.log('DONE');
            return realm;
        }).catch(e => alert(e.message));
        return r as any;
    } catch (error) {
        console.error((error as any).message);
        alert((error as Error).message);
        throw error;
    }
}
export function useProvideRealmContext() {
    const app = useRef(new Realm.App(config.realm.appID));
    const isConnected = useConnectivityStatus();
    console.log('useProvideRealmContext');
    console.log('app', app.current.id);
    const [reader, updateReader] = useAsyncResource(createRealm, app.current, config.realm.credentials, isConnected);
    return useMemo(() => ({ reader }), [reader]);
}
