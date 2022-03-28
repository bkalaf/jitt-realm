import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';
import { Lot } from '../lot/index';
import { $$datatypes, $$names, RowHeadCell } from '../../../controls/index';

export type AuctionSite = {
    _id: ObjectId;
    name: string;
    website?: string;
    lots: Lot[];
};
export class AuctionSiteDTO {
    static schema: ObjectSchema = {
        name: $$names.auctions.auctionSite,
        primaryKey: '_id',
        properties: {
            _id: $$datatypes.objectId,
            id: $$datatypes.int,
            name: $$datatypes.string,
            website: $$datatypes.opt.string,
            lots: {
                type: $$datatypes.linkingObjects,
                objectType: $$names.auctions.lot,
                property: 'auctionSite'
            }
        }
    };
}
export const auctionSiteInitial = () => {
    const result = {} as any;
    result._id = new ObjectId().toHexString();
    result.name = '';
    result.website = '';
    result.lots = [] as Realm.Object[];
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
            <RowHeadCell scope='row' data={data} />
            <td>{data.name}</td>
            <td>{data.website}</td>
            <td>{data.lots.length}</td>
        </tr>
    );
}
