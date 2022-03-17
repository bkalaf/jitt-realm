import { Outlet, Route, Routes, useRoutes } from 'react-router';
import { Boundary } from '../components/suspense/Boundary';
import { useParams } from 'react-router';
import { NewEmbeddedContext } from '../routes/providers/EmbeddedContext/index';
import { Form } from '../routes/forms/Form';
import { Bound } from '../routes/providers/EmbeddedContext/Bound';
import { $grid, $reference } from './references';
import { Grid } from '../routes/Grid';
import { $$names } from '../routes/controls';

type View = React.FunctionComponent<{
    realm: Realm;
}>;
type InsertView<T> = React.FunctionComponent<{
    realm: Realm;
    type: string;
    initial: () => T;
}>;

export function EntityRoute<T>({ Grid, Insert, Edit, routeName, realm, initial }: { Grid: View; Insert: InsertView<T>; Edit: InsertView<T>; routeName: string; realm: Realm; initial: () => T }) {
    const element = useRoutes([
        {
            path: routeName,
            children: [
                { path: 'new', element: <Insert type={routeName} initial={initial} realm={realm} /> },
                { path: ':id', element: <Edit type={routeName} initial={initial} realm={realm} /> },
                { index: true, element: <Grid realm={realm} /> }
            ]
        }
    ]);
    return element;
}

{
    /* <Route path={routeName}>
            <Route path='new' element={<Insert type={routeName} initial={initial} realm={realm} />} />
            <Route path=':id' element={<Edit type={routeName} initial={initial} realm={realm} />} />
            <Route index element={<Grid realm={realm} />} />
        </Route> */
}

export function EditForm({ realm }: { realm: Realm }) {
    const { id } = useParams();
    return (
        <div>
            <span>{id}</span>
        </div>
    );
}

export function InsertForm(props: { type: string; children: Children; realm: Realm; initial: () => any; convertTo: (x: any, realm?: Realm) => any }) {
    return (
        <Bound>
            <Form {...props} name='insert' drillOnSuccess></Form>;
        </Bound>
    );
}

export function DynamicRouteBase({ realm }: { realm: Realm }) {
    const { type } = useParams();
    return (
        <NewEmbeddedContext realm={realm} type={type ?? ''}>
            <Outlet />
        </NewEmbeddedContext>
    );
}
export function DynamicNewRoute({ realm }: { realm: Realm }) {
    const { type } = useParams();
    return <InsertForm realm={realm} type={type ?? ''} {...$reference[type!]}></InsertForm>;
}
export function DynamicGrid({ realm }: { realm: Realm }) {
    const { type } = useParams();
    return <Grid typeName={type ?? ''} realm={realm} {...$grid[type ?? '']} />;
}
export function toRoute(realm: Realm) {
    return (
        <Route path=':type' element={<DynamicRouteBase realm={realm} />}>
            <Route path='new' element={<DynamicNewRoute realm={realm} />} />
            <Route path=':id' element={<EditForm realm={realm} />} />
            <Route index element={<DynamicGrid realm={realm} />} />
        </Route>
    );
}
export function Viewport({ realm }: { realm: Realm }) {
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={$$names.tier1.data}>
                    <Route path='v1'>
                        <Route path={$$names.tier2.auctions}>
                            {toRoute(realm)}
                            {/* <Route
                                path={$$names.auctions.selfStorage}
                                element={
                                    <NewEmbeddedContext realm={realm} type={$$names.auctions.selfStorage}>
                                        <Outlet />
                                    </NewEmbeddedContext>
                                }>
                                <Route
                                    path='new'
                                    element={
                                        <InsertForm convertTo={selfStorageConvertIn} type={$$names.auctions.selfStorage} realm={realm} initial={selfStorageInitial}></InsertForm>
                                        // <Bound>
                                        //     <Form convertTo={selfStorageConvertIn} type={$$names.auctions.selfStorage} realm={realm} initial={selfStorageInitial} name='insert' drillOnSuccess>
                                        // <TextInputControl type='text' name='name' required />
                                        // <TextInputControl type='url' name='website' />
                                        //     </Form>
                                        // </Bound>
                                    }
                                />
                            </Route>
                            <Route
                                path={$$names.auctions.facility}
                                element={
                                    <NewEmbeddedContext realm={realm} type={$$names.auctions.facility}>
                                        <Outlet />
                                    </NewEmbeddedContext>
                                }>
                                <Route path='new' element={NewFacilityComponent(realm)} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<FacilityGrid realm={realm} />} />
                            </Route>
                            <Route path={$$names.auctions.auctionSite}>
                                <Route path='new' element={<AuctionSiteInsertForm realm={realm} />} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<AuctionSiteGrid realm={realm} />} />
                            </Route>
                            <Route path={$$names.auctions.lot}>
                                <Route path='new' element={<LotInsertForm realm={realm} type={$$names.auctions.lot} />} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<LotGrid realm={realm} />} />
                            </Route> */}
                        </Route>
                        {/* <Route path=':type'>
                            <Route path='new' element={<Records isInsert isGrid={false} realm={realm} {...selectable} />} />
                            <Route
                                path='*'
                                element={<Refinement matchNew realm={realm} {...selectable} isGrid={false} isInsert={false} />}
                            />
                            <Route index element={<Records isInsert={false} isGrid={true} realm={realm} {...selectable} />} />
                        </Route> */}
                    </Route>
                </Route>
                <Route index element={<></>} />
            </Routes>
        </Boundary>
    );
}


