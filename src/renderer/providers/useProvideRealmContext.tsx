import Realm from 'realm';
import config from './../../../config.json';
import { useAsyncResource } from '../hooks/useAsyncResource';
import { schema } from '../db';
import { useMemo, useRef } from 'react';
import { useConnectivityStatus } from '../hooks/useConnectivityStatus';

function createRealm(app: Realm.App, credentials: string, isConnected: boolean) {
    try {
        if (isConnected) {
            return app.logIn(eval(credentials)).then((user) =>
                Realm.open({
                    schema: schema,
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
    } catch (error) {
        console.error((error as any).message);
        throw error;
    }
    return Realm.open({
        schema: schema,
        path: config.realm.localRealmPath
    });
}
export function useProvideRealmContext() {
    const app = useRef(new Realm.App(config.realm.appID));
    const isConnected = useConnectivityStatus();
    console.log('useProvideRealmContext');
    console.log('app', app.current.id);
    const [reader, updateReader] = useAsyncResource(createRealm, app.current, config.realm.credentials, isConnected);
    return useMemo(() => ({ reader }), [reader]);
}
