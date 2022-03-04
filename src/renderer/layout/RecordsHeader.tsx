import { useParams } from 'react-router';
import { ObjectId } from 'bson';
import { useObjectClass } from './Window';
import { useTheme } from "../providers/useTheme";

export function RecordsHeader({ realm, isInsert }: { realm: Realm; isInsert: boolean }) {
    const { type, id } = useParams();
    const objectClass = useObjectClass();
    const className = useTheme({}, 'flex justify-start w-full py-2 whitespace-pre rounded-lg', 'records', 'header');
    return (
        <header className={className}>
            <span className='ml-2 inline-flex before:content-["_"]'>{type?.replace('-', ' ')}</span>
            {id && (
                <span className='inline-flex before:content-["_-_"]'>
                    {objectClass.toDisplayName(realm.objectForPrimaryKey(type!, new ObjectId(id)))}
                </span>
            )}
            {isInsert && <span className='before:content-["_-_"] inline-flex'>New Record</span>}
        </header>
    );
}
