import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faFilePlus, faHome } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Boundary } from '../components/suspense/Boundary';
import { useDescendOnClick } from '../hooks/useDescendOnClick';
import { useRealm } from '../hooks/useRealm';
import { routeNames } from '../routes/constants';
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
                    <Route path={routeNames.tier1.api}>
                        <Route path='v1'></Route>
                        <Route index element={<Empty />} />
                    </Route>
                    <Route path={routeNames.tier1.data}>
                        <Route path='v1'>
                            <Route path={routeNames.tier2.auctions}>
                                {/* <Route path={routeNames.auctions.auctionSite}></Route>
                                <Route path={routeNames.auctions.facility}></Route>
                                <Route path={routeNames.auctions.lot}></Route>
                                <Route path={routeNames.auctions.selfStorage} element={<InsertButton />}> */}
                                <Route path=':type' element={<InsertButton />} />
                                <Route path='*' element={<Auctions />} />
                                <Route index element={<Auctions />} />
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
            <MenuItem to={routeNames.auctions.auctionSite} />
            <MenuItem to={routeNames.auctions.facility} />
            <MenuItem to={routeNames.auctions.lot} />
            <MenuItem to={routeNames.auctions.selfStorage} />
        </>
    );
}
export function Tier2() {
    return (
        <>
            <MenuItem to={routeNames.tier2.auctions} />
            <MenuItem to={routeNames.tier2.expenses} />
            <MenuItem to={routeNames.tier2.files} />
            <MenuItem to={routeNames.tier2.fulfillment} />
            <MenuItem to={routeNames.tier2.inventory} />
            <MenuItem to={routeNames.tier2.listings} />
            <MenuItem to={routeNames.tier2.products} />
        </>
    );
}
export function Tier1() {
    return (
        <>
            <MenuItem to={routeNames.tier1.api} />
            <MenuItem to={routeNames.tier1.data} />
            <MenuItem to={routeNames.tier1.reports} />
            <MenuItem to={routeNames.tier1.todos} />
        </>
    );
}
