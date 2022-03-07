import { $$names } from '@controls/constants';
import { InsertForm } from '../../../forms/InsertForm';
import { InputControl } from '../../../controls/InputControl';
import { SelfStorage } from '.';
import * as BSON from 'bson';

export const selfStorageInitial = (): SelfStorage => ({ _id: new BSON.ObjectId(), name: '', website: '', facilities: [] });

export function SelfStorageInsertForm({ realm }: { realm: Realm }) {
    return (
        <InsertForm initial={selfStorageInitial} type={$$names.auctions.selfStorage} realm={realm}>
            <InputControl inputType='text' name='name' required />
            <InputControl inputType='url' name='website' />
        </InsertForm>
    );
}
