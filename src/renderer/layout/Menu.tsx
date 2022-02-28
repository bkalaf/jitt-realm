import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { $Facility } from '../db/Facility';
import { $SelfStorage } from '../db/SelfStorage';
import { MenuItem } from './MenuItem';

export function Menu() {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        navigate(-1);
    }, []);
    return (
        <div className='flex items-center justify-start text-white bg-black'>
            <button
                className='flex px-3 py-1.5 transition-all text-white text-xl font-firaSans font-bold bg-blue-dark border h-full border-white'
                type='button'
                onClick={onClick}>
                <FontAwesomeIcon icon={faArrowCircleLeft} size='lg' />
            </button>
            <Routes>
                <Route path='api'>
                    <Route path='v1'></Route>
                    <Route index element={<Navigate to='v1' />} />
                </Route>
                <Route path='data'>
                    <Route path='v1'>
                        <Route
                            path='*'
                            element={
                                <>
                                    <MenuItem to={$SelfStorage} />
                                    <MenuItem to={$Facility} />
                                </>
                            }
                        />
                        <Route
                            index
                            element={
                                <>
                                    <MenuItem to={$SelfStorage} />
                                    <MenuItem to={$Facility} />
                                </>
                            }
                        />
                    </Route>
                    <Route index element={<Navigate to='v1' />} />
                </Route>
                <Route
                    index
                    element={
                        <>
                            <MenuItem to='data' />
                            <MenuItem to='api' />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}
