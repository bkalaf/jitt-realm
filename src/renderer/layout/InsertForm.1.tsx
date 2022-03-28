import { Form } from '../routes/forms/Form';
import { Bound } from '../routes/providers/EmbeddedContext/Bound';


export function InsertForm(props: { type: string; children: Children; realm: Realm; initial: () => any; convertTo: (x: any, realm?: Realm) => any; }) {
    return (
        <Bound>
            <Form {...props} name='insert' drillOnSuccess></Form>;
        </Bound>
    );
}
