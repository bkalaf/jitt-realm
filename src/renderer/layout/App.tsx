import { HashRouter } from 'react-router-dom';
import Window from './Window';
import { RealmProvider } from '../providers/RealmProvider';
import { useMemo } from 'react';
import './../../assets/css/app.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import { DataListProvider } from '../providers/DataListContext';
import { Loading } from './Loading';

export default function App() {
    const fallback = useMemo(() => <Loading />, []);
    return (
        <HashRouter>
            <DataListProvider>
                <RealmProvider>
                    <ThemeProvider>
                        <Window />
                    </ThemeProvider>
                </RealmProvider>
            </DataListProvider>
        </HashRouter>
    );
}
