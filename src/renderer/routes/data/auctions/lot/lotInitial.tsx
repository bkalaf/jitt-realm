/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ObjectId } from 'bson';
import { toDate } from '../../../../layout/toDate';

export function lotInitial() {
    const result = {} as any;
    result._id = new ObjectId().toHexString();
    result.auctionID = '';
    result.closeDate = toDate(new Date(Date.now()));
    result.cost = JITTRegistrar.getInitial('cost')();
    result.unit = '';
    result.unitSize = '';
    result.cleanout = '72';
    Object.defineProperty(result, 'name', {
        get: function (this: any) {
            return `${typeof this.closeDate === 'string' ? this.closeDate : toDate(this.closeDate)}: ${this.facility?.name ?? ''}`;
        }
    });
    return result;
}
