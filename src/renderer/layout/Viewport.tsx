import { Route, Routes, useRoutes } from 'react-router';
import { RecordSet } from './RecordSet';
import { Records } from './Records';
import { Refinement } from './Refinement';
import { useSelectable } from './useSelectable';
import { $SelfStorage } from '../db/SelfStorage';
import { $Facility } from '../db/Facility';
import { Boundary } from '../components/suspense/Boundary';
import { $$names } from '@controls/constants';
import { selfStorageInitial, SelfStorageInsertForm } from '../routes/data/auctions/selfStorage/SelfStorageInsertForm';
import { SelfStorageGrid } from '../routes/data/auctions/selfStorage/SelfStorageGrid';
import { FacilityInsertForm } from '../routes/data/auctions/facility';
import { FacilityGrid } from '../routes/data/auctions/facility/FacilityGrid';
import { AuctionSiteGrid, AuctionSiteInsertForm } from '../routes/data/auctions/site';
import { useParams } from 'react-router';
import { LotInsertForm, LotGrid } from '../routes/data/auctions/lot';

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
export function Viewport({ realm }: { realm: Realm }) {
    const selectable = useSelectable();
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={$$names.tier1.data}>
                    <Route path='v1'>
                        <Route path={$$names.tier2.auctions}>
                            <Route path={$$names.auctions.selfStorage}>
                                <Route path='new' element={<SelfStorageInsertForm realm={realm} />} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<SelfStorageGrid realm={realm} />} />
                            </Route>
                            <Route path={$$names.auctions.facility}>
                                <Route path='new' element={<FacilityInsertForm realm={realm} />} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<FacilityGrid realm={realm} />} />
                            </Route>
                            <Route path={$$names.auctions.auctionSite}>
                                <Route path='new' element={<AuctionSiteInsertForm realm={realm} />} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<AuctionSiteGrid realm={realm} />} />
                            </Route>
                            <Route path={$$names.auctions.lot}>
                                <Route path='new' element={<LotInsertForm realm={realm} />} />
                                <Route path=':id' element={<EditForm realm={realm} />} />
                                <Route index element={<LotGrid realm={realm} />} />
                            </Route>
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
