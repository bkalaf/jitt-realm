import { Outlet, Route, Routes } from 'react-router';
import { Boundary } from '../components/suspense/Boundary';
import { $$names } from '../routes/controls';
import { useEffect } from 'react';
import { createReflection, ORMType } from '../reflection/Reflection';
import ORM from './../../../orm-output.json'
import { toRouting, FileUpload, FileGrid } from './Viewport';
import { $$schemaOC } from '../models';

// FIXME deal with globals
export function Viewport({ realm }: { realm: Realm }) {
    // useEffect(() => {
    //     const reflector = Reflector.Get(realm, $$schemaOC);
    //     global.getTypeInfo = Reflector.Get(realm, $$schemaOC).getTypeInfo.bind(reflector) as any;
    //     global.autoIncrement = Reflector.Get(realm, $$schemaOC).autoIncrement.bind(reflector) as any;
    //     global.getFieldInfo = reflector.getFieldInfo.bind(reflector);
    //     global.getObjectClass = reflector.getObjectClass.bind(reflector);
    //     global.JITTRealm = () => realm;
    // }, [realm]);
    useEffect(() => {
        global.Reflection = function () {
            console.log('ORM', ORM);
            return createReflection(realm, $$schemaOC, ORM as any as ORMType);
        };
    }, [realm]);
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={$$names.tier1.data}>
                    <Route path='v1'>
                        <Route path={$$names.tier2.auctions}>{toRouting(realm)}</Route>
                        <Route path={$$names.tier2.files}>
                            <Route path='new' element={<FileUpload realm={realm} />} />
                            <Route index element={<FileGrid realm={realm} />} />
                        </Route>
                        <Route index element={<Outlet />} />
                    </Route>
                </Route>
                <Route index element={<Outlet />} />
            </Routes>
        </Boundary>
    );
}
