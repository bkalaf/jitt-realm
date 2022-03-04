import { useLocation } from 'react-router';
import { DataReader } from '../../common/resource';
import { Boundary } from '../components/Boundary';
import { Menu } from './Menu';
import { Viewport } from './Viewport';

export function Frame({ realm }: { realm: DataReader<Realm>; }) {
    const location = useLocation();
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <div className='flex flex-col w-screen h-screen'>
                <Menu />
                <div className='flex flex-grow p-3 bg-yellow-light'>
                    <Viewport realm={realm.read()} />
                </div>
                <div className='flex bg-pink-light'>
                    <span className='inline-flex py-0.5 px-2 bg-red text-white'>{location.pathname}</span>
                </div>
            </div>
        </Boundary>
    );
}
