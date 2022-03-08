import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '../providers/useTheme';
import { useThemeSetting } from '../hooks/useThemeSetting';
import { HeaderCell } from './HeaderCell';

export function RecordSetHeader({ isSelectable, headers }: { isSelectable: boolean; headers: string[] }) {
    const className = useTheme({}, 'w-full text-center', 'records', 'table', 'header');
    return (
        <thead className={className}>
            <tr>
                {isSelectable && (
                    <HeaderCell className='text-lg font-bold text-white bg-black border border-white border-double font-firaSans' scope='col' key={0}>
                        <FontAwesomeIcon icon={faBox} size='1x' />
                    </HeaderCell>
                )}
                {headers.map((x, ix) => (
                    <HeaderCell className='text-lg font-bold text-white bg-black border border-white border-double font-firaSans' key={isSelectable ? ix + 1 : ix} scope='col'>
                        {x}
                    </HeaderCell>
                ))}
            </tr>
        </thead>
    );
}
