import { Route, Routes } from 'react-router';
import { RecordSet } from './RecordSet';
import { Records } from "./Records";
import { Refinement } from "./Refinement";
import { useSelectable } from "./useSelectable";

export function Viewport({ realm }: { realm: Realm; }) {
    const selectable = useSelectable();
    return (
        <Routes>
            <Route path='data'>
                <Route path='v1'>
                    <Route path=':type'>
                        <Route path='new' element={<Records isInsert isGrid={false} realm={realm} {...selectable} />} />
                        <Route path='*' element={<Refinement matchNew realm={realm} {...selectable} isGrid={false} isInsert={false} />} />
                        <Route
                            index
                            element={<Records
                                isInsert={false}
                                isGrid={true}
                                realm={realm}
                                {...selectable} />} />
                    </Route>
                </Route>
            </Route>
            <Route index element={<></>} />
        </Routes>
    );
}
