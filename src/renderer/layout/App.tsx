import { HashRouter } from 'react-router-dom';
import Window from './Window';
import { RealmProvider } from '../providers/RealmProvider';
import { useMemo } from 'react';
import './../../assets/css/app.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import { DataListProvider } from '../providers/DataListContext';
import { Loading } from './Loading';
import { Boundary } from '../components/suspense/Boundary';

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
