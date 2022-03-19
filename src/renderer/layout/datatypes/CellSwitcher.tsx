import { $$Schema } from '../../db/index';
import { LookupCell } from './LookupCell';
import { ListCell } from './ListCell';
import { IntCell } from './IntCell';
import { StringCell } from './StringCell';
import { EnumCell } from './EnumCell';
import { FloatCell } from './FloatCell';
import { IDCell } from './IDCell';
import { EmbeddedCell } from './EmbeddedCell';
import { BoolCell } from './BoolCell';
import { CalculatedCell } from './CalculatedCell';

export function CellSwitcher<T extends React.InputHTMLAttributes<HTMLInputElement> | React.SelectHTMLAttributes<HTMLSelectElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>>({
    data,
    name,
    datatype,
    enumMap,
    calculated,
    func
}: {
    func?: string;
    calculated: boolean;
    data: Realm.Object & Record<string, any>;
    name: string;
    datatype: DataTypes;
    enumMap?: Record<string, string>;
} & T) {
    console.log('DataCell: ', datatype, name);
    if (calculated) {
        return <CalculatedCell data={data} func={func ?? 'x => identity(x)'} />;
    }
    switch (datatype as DataTypes) {
        case 'string':
            if (enumMap != null && Object.keys(enumMap).length !== 0) {
                return <EnumCell data={data} name={name} enumMap={enumMap} />;
            }
            return <StringCell data={data} name={name} />;
        case 'int':
            return <IntCell data={data} name={name} />;
        case 'double':
            return <FloatCell data={data} name={name} scale={2} />;
        case 'float':
            return <FloatCell data={data} name={name} scale={4} />;
        case 'objectId':
            return <IDCell data={data} name={name} />;
        case 'data':
        case 'bool':
            return <BoolCell data={data} name={name} />;
        case 'date':
        case 'uuid':
            throw new Error(`Unhandled column type: ${datatype}`);
        case 'list':
        case 'set':
            return <ListCell data={data} name={name} />;
        case 'Address': {
            const obj = $$Schema[datatype];
            return <EmbeddedCell data={data} name={name} schema={obj} />;
        }
        case 'Facility':
        case 'SelfStorage': {
            const obj = $$Schema[datatype];
            return <LookupCell data={data as any} name={name} schema={obj} />;
        }
        case undefined:
            return <StringCell data={data} name={name} />;
        default: {
            // const obj = schema.filter((x) => x.schema.name === datatype)[0];
            // if (obj.schema.embedded) {
            //     return <EmbeddedCell data={data} name={name} schema={obj} />;
            // } else if (obj.schema.primaryKey === '_id') {
            //     return <LookupCell data={data as any} name={name} schema={obj} />;
            // }
            // const obj = schema.filter((x) => x.schema.name === datatype)[0];
            // if (obj.schema.embedded) {
            //     return <EmbeddedCell data={data} name={name} schema={obj} />;
            // } else if (obj.schema.primaryKey === '_id') {
            //     return <LookupCell data={data as any} name={name} schema={obj} />;
            // }
            throw new Error(`Unhandled column type: ${datatype}`);
        }
    }
}
