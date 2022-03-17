import { $$names } from '../../../controls/index';
import { Grid } from '../../../Grid';
import { FacilityHeader } from './FacilityHeader';
import { FacilityRow } from './FacilityRow';

export function FacilityGrid({ realm }: { realm: Realm }) {
    return (
        <Grid
            realm={realm}
            typeName={$$names.auctions.facility}
            sort={[]}
            GridHeaders={FacilityHeader}
            TableRow={FacilityRow}
        ></Grid>
    );
}
