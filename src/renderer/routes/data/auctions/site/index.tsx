import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { dt, routeNames } from '../../../constants';
import { InputControl } from '../../../controls/InputControl';
import { InsertForm } from '../../../forms/InsertForm';
import { Grid } from '../../../Grid';
import { RowID } from '../facility/RowID';
import { Lot } from '../lot';

export type AuctionSite = {
    _id: ObjectId;
    name: string;
    website?: string;
    lots: Lot[];
};
export class AuctionSiteDTO {
    static schema: ObjectSchema = {
        name: routeNames.auctions.auctionSite,
        primaryKey: '_id',
        properties: {
            _id: dt.objectId,
            name: dt.string,
            website: dt.opt.string,
            lots: {
                type: dt.linkingObjects,
                objectType: routeNames.auctions.lot,
                property: 'auctionSite'
            }
        }
    };
    toLookup(): string {
        return (this as any).name;
    }
}
export const auctionSiteInitial = () => {
    const result = new AuctionSiteDTO() as any as AuctionSite;
    result._id = new ObjectId();
    result.name = '';
    result.website = '';
    result.lots = [];
    return result;
};

export function AuctionSiteHeaders() {
    return (
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Website</th>
            <th>Lot Count</th>
        </tr>
    );
}

export function AuctionSiteRow({ data, index, typeName }: { typeName: string; index: number; data: Realm.Object & AuctionSite }) {
    return (
        <tr key={index} data-id={data._id.toHexString()}>
            <RowID data={data} />
            <td>{data.name}</td>
            <td>{data.website}</td>
            <td>{data.lots.length}</td>
        </tr>
    );
}

export function AuctionSiteGrid({ realm }: { realm: Realm }) {
    return (
        <Grid
            typeName={routeNames.auctions.auctionSite}
            realm={realm}
            sort={[['name', false]]}
            GridHeaders={AuctionSiteHeaders}
            TableRow={AuctionSiteRow}
        />
    );
}
export function AuctionSiteInsertForm({ realm }: { realm: Realm }) {
    return (
        <InsertForm realm={realm} type={routeNames.auctions.auctionSite} initial={auctionSiteInitial}>
            <InputControl name='name' inputType='text' required />
            <InputControl name='website' inputType='url' />
        </InsertForm>
    );
}
