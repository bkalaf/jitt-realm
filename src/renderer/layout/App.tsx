import { HashRouter } from 'react-router-dom';
import Window from './Window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Boundary } from '../components/Boundary';
import { RealmProvider } from '../providers/RealmProvider';
import { useMemo } from 'react';
import './../../assets/css/app.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import { DataListProvider } from '../providers/DataListContext';

export function Loading() {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='flex'>
                <FontAwesomeIcon icon={faSpinner} spin size='5x' color='blue' />
            </div>
        </div>
    );
}
export default function App() {
    const fallback = useMemo(() => <Loading />, []);
    return (
        <Boundary fallback={fallback}>
            <HashRouter>
                <DataListProvider>
                    <RealmProvider>
                        <ThemeProvider>
                            <Window />
                        </ThemeProvider>
                    </RealmProvider>
                </DataListProvider>
            </HashRouter>
        </Boundary>
    );
}
