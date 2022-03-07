import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export function Loading() {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='flex'>
                <FontAwesomeIcon icon={faSpinner} spin size='5x' color='blue' />
            </div>
        </div>
    );
}
