import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { useCallback } from 'react';
import { useType } from './routeBase';
import { CellPresenter } from './CellPresenter';

export function Cell({
    data,
    icon,
    name,
    tooltip,
    prefix,
    info: { format, ...info }
}: {
    data: Realm.Object & Record<string, any>;
    name: string;
    icon?: IconDefinition;
    tooltip?: string;
    prefix?: string[];
    info: IFieldInfo;
}) {
    const formatFunc = useCallback(
        (value: any) => {
            return format == null ? value : eval(format)(value);
        },
        [format]
    );
    return <CellPresenter format={formatFunc} name={name} data={data} tooltip={tooltip} icon={icon} />;
}
