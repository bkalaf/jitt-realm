import { useLocation } from 'react-router';
import { DataReader } from '../../common/resource';
import { Boundary } from '../components/suspense/Boundary';
import { Menu } from './Menu';
import { Viewport } from './Viewport';

export function Frame({ realm }: { realm: DataReader<Realm>; }) {
    const location = useLocation();
    return (
        <Boundary fallback={<div>Loading...</div>}>
            <div className='flex flex-col w-screen h-screen'>
                <Menu realm={realm.read()}/>
                <div className='flex flex-col flex-grow p-1 bg-sky-light'>
                    <Viewport realm={realm.read()} />
                    <div className='flex flex-grow'></div>
                </div>
                <div className='flex bg-pink-light'>
                    <span className='inline-flex py-0.5 px-2 bg-red text-white'>{location.pathname}</span>
                </div>
            </div>
        </Boundary>
    );
}
