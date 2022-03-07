import { camelToTitleCase } from '../../../common/text/camelToTitleCase';
import { toTitleCase } from '../../../common/text/toTitleCase';
import { $useThemeClassNames } from '../../db/SelfStorage';

export function FieldSetControl({ name, children, display, realm, getter, feedbacking, unsubscribe, setter, setValue, subscribe }: { name: string; children: Children; display?: string; getter?: any; setter?: any; onValidate?: any; realm?: Realm; feedbacking?: boolean; subscribe?: () => void; unsubscribe?: () => void; setValue?: any;  }) {
    const adjustName = (s: string) => `${name}.${s}`;
    const displayName = display == null ? toTitleCase(name) : display;
    const fieldSetCn = $useThemeClassNames('fieldset');
    const legendCn = $useThemeClassNames('legend');
    return (
        <fieldset name={name} id={`${name}-fieldset`} className={fieldSetCn}>
            <legend id={`${name}-fieldset-legend`} className={legendCn}>
                {displayName}
            </legend>
            {React.Children.toArray(children).map((x, ix) => {
                const el = x as React.ReactElement;
                return React.cloneElement(el, { ...el.props, key: ix, name: adjustName(el.props.name), display: el.props.display ? el.props.display : camelToTitleCase(el.props.name),
                realm, feedbacking, setter, getter, subscribe, setValue, unsubscribe });
            })}
        </fieldset>
    );
}
