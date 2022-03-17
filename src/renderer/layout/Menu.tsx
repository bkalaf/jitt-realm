import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faFilePlus, faHome } from '@fortawesome/pro-solid-svg-icons';
import { useCallback } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router';
import { Boundary } from '../components/suspense/Boundary';
import { useDescendOnClick } from '../hooks/useDescendOnClick';
import { $$names } from '../routes/controls';
import { MenuItem } from './MenuItem';

export function Empty() {
    return <></>;
}
export function Menu({ realm }: { realm: Realm }) {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);
    const descend = useDescendOnClick();
    const onClick2 = useCallback(() => {
        navigate('/');
    }, [navigate]);
    return (
        <Boundary fallback={<div>Loading</div>}>
            <nav role='navigation'>
                <MenuItem icon={faArrowCircleLeft} onClick={onClick} tooltip='Go back...' />
                <MenuItem icon={faHome} onClick={onClick2} tooltip='Go to the home page' />
                <Routes>
                    <Route path={$$names.tier1.api}>
                        <Route path='v1'></Route>
                        <Route index element={<Empty />} />
                    </Route>
                    <Route path={$$names.tier1.data}>
                        <Route path='v1'>
                            <Route path={$$names.tier2.auctions}>
                                {/* <Route path={routeNames.auctions.auctionSite}></Route>
                                <Route path={routeNames.auctions.facility}></Route>
                                <Route path={routeNames.auctions.lot}></Route>
                                <Route path={routeNames.auctions.selfStorage} element={<InsertButton />}> */}
                                <Route path=':type' element={<InsertButton />} />
                                <Route path='*' element={<Auctions />} />
                                <Route index element={<Auctions />} />
                            </Route>
                            <Route path={$$names.tier2.files}>
                                {/* <Route path={routeNames.auctions.auctionSite}></Route>
                                <Route path={routeNames.auctions.facility}></Route>
                                <Route path={routeNames.auctions.lot}></Route>
                                <Route path={routeNames.auctions.selfStorage} element={<InsertButton />}> */}
                                <Route path=':type' element={<InsertButton />} />
                                <Route path='*' element={<></>} />
                                <Route index element={<InsertButton />} />
                            </Route>
                            <Route index element={<Tier2 />} />
                        </Route>
                        <Route index element={<Navigate to='v1' replace />} />
                    </Route>
                    <Route index element={<Tier1 />} />
                </Routes>
            </nav>
        </Boundary>
    );
}

export function InsertButton() {
    const navigate = useNavigate();
    const onClick = useCallback(() => navigate('new'), [navigate]);
    return (
        <>
            <Outlet />
            <MenuItem onClick={onClick} icon={faFilePlus} />
        </>
    );
}

export function Auctions() {
    return (
        <>
            <MenuItem to={$$names.auctions.auctionSite} />
            <MenuItem to={$$names.auctions.facility} />
            <MenuItem to={$$names.auctions.lot} />
            <MenuItem to={$$names.auctions.selfStorage} />
        </>
    );
}
export function Tier2() {
    return (
        <>
            <MenuItem to={$$names.tier2.auctions} />
            <MenuItem to={$$names.tier2.expenses} />
            <MenuItem to={$$names.tier2.files} />
            <MenuItem to={$$names.tier2.fulfillment} />
            <MenuItem to={$$names.tier2.inventory} />
            <MenuItem to={$$names.tier2.listings} />
            <MenuItem to={$$names.tier2.products} />
        </>
    );
}
export function Tier1() {
    return (
        <>
            <MenuItem to={$$names.tier1.api} />
            <MenuItem to={$$names.tier1.data} />
            <MenuItem to={$$names.tier1.reports} />
            <MenuItem to={$$names.tier1.todos} />
        </>
    );
}
