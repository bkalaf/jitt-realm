import { InputControl } from '.';
import { identity } from '../../../common/identity';

export function PrimaryKeyField(props: any) {
    return <InputControl type='text' name='_id' displayName='ID' validators={[]} required readOnly stringify={identity} parse={identity} {...props}/>;
}
