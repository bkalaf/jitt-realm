import { Route, Routes } from 'react-router';
import { Records } from "./Records";
import { Selectable } from './Window';

export function Refinement({
    realm,
    matchNew,
    isInsert,
    isGrid,
    ...selectable
}: {
    realm: Realm;
    matchNew?: boolean;
    isGrid: boolean;
    isInsert: boolean;
} & Selectable) {
    return (
        <Routes>
            {(matchNew ?? false) && <Route path='new' element={<div>New</div>} />}
            <Route path='sort' element={<div>Sort</div>} />
            <Route path='filter' element={<div>Filter</div>} />
            <Route path=':id'>
                <Route
                    index
                    element={
                        <Records
                            isInsert={isInsert}
                            isGrid={isGrid}
                            realm={realm}
                            {...selectable}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}
