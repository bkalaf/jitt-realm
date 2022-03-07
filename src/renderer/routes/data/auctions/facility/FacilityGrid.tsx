import { $$names } from '@controls/constants';
import { Grid } from '../../../Grid';
import { FacilityHeader } from './FacilityHeader';
import { FacilityRow } from './FacilityRow';

export function FacilityGrid({ realm }: { realm: Realm }) {
    return (
        <Grid
            realm={realm}
            typeName={$$names.auctions.facility}
            sort={[
                ['selfStorage.name', false],
                ['address.state', false],
                ['address.city', false]
            ]}
            GridHeaders={FacilityHeader}
            TableRow={FacilityRow}></Grid>
    );
}
