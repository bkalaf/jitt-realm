import { provinceMap } from '../../../../db/enums/Provinces';
import { countryMap } from '../../../../db/enums/CountryISO2';
import { RowHeadCell } from '../../../controls/index';
import { Facility } from './Facility';

export function FacilityRow({ data, typeName, index }: { data: Realm.Object & Facility; index: number; typeName: string }) {
    return (
        <tr key={index} data-id={data._id.toHexString()}>
            <RowHeadCell scope='row' data={data} />
            <td>{data.name}</td>
            <td>{(data.selfStorage as any)?.name}</td>
            <td>{data.facilityNumber}</td>
            <td>{data.phoneNumber}</td>
            <td>{data.email}</td>
            <td>{data.address?.street}</td>
            <td>{data.address?.suite}</td>
            <td>{data.address?.city}</td>
            <td>{provinceMap[data.address?.state ?? 'CA']}</td>
            <td>{countryMap[data.address?.country ?? 'US']}</td>
            <td>{data.address?.postal}</td>
        </tr>
    );
}
