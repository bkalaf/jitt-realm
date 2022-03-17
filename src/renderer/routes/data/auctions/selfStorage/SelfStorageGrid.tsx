import { $$names } from '../../../controls/index';
import { Grid } from '../../../Grid';
import { SelfStorageHeaders } from './SelfStorageHeaders';
import { SelfStorageRow } from './SelfStorageRow';

export function SelfStorageGrid({ realm }: { realm: Realm }) {
    return <Grid GridHeaders={SelfStorageHeaders} TableRow={SelfStorageRow} realm={realm} typeName={$$names.auctions.selfStorage} sort={[['name', false]]}></Grid>;
}
