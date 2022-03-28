import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { identity } from '../../common/identity';
import { getProperty } from '../../common/object/getProperty';

export function CellPresenter({ data, name, format, tooltip, icon }: { data: Realm.Object & Record<string, any>; icon?: IconDefinition; tooltip?: string; name: string; format?: (obj: any) => any }) {
    const formatter = format ?? identity;
    const value = getProperty(name, data);
    const title = icon ? formatter(value) : tooltip;
    const content = icon ? <FontAwesomeIcon icon={icon} size='1x' /> : <>{formatter(value)?.toString()}</>;
    return (
        <td title={title}>
            <span>{content}</span>
        </td>
    );
}
