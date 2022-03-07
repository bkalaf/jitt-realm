import { routeNames } from '../../../constants';
import { Grid } from '../../../Grid';
import { FacilityHeader } from './FacilityHeader';
import { FacilityRow } from './FacilityRow';

export function FacilityGrid({ realm }: { realm: Realm }) {
    return (
        <Grid
            realm={realm}
            typeName={routeNames.auctions.facility}
            sort={[
                ['selfStorage.name', false],
                ['address.state', false],
                ['address.city', false]
            ]}
            GridHeaders={FacilityHeader}
            TableRow={FacilityRow}></Grid>
    );
}
