import { useNavigate } from 'react-router';
import { faCheckDouble, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToolbarButton } from './ToolbarButton';

export function Toolbar({ isInsert, isGrid, isSelectable, setSelectable }: { isInsert: boolean; isGrid: boolean; isSelectable: boolean; setSelectable: StateSetter<boolean> }) {
    const navigate = useNavigate();
    // insert, select, selectAll, clearSelect, edit, delete, serach, filter, addFilter, clearFiled, addSort, clearSort
    return (
        <div className='flex bg-stone-dark text-black items-center justify-start p-1'>
            {!isInsert && <ToolbarButton title='Add a new record' onClick={() => navigate('new')} icon={faPlusSquare} size='lg' />}
            {!isSelectable && <ToolbarButton title='Select multiple records...' onClick={() => setSelectable((prev) => !prev)} icon={faCheckDouble} size='lg' />}
        </div>
    );
}
