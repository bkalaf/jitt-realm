/* eslint-disable @typescript-eslint/unbound-method */
import { Outlet, Route, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { NewEmbeddedContext } from '../routes/providers/EmbeddedContext/index';
import { $grid, $reference } from './references';
import { Grid } from '../routes/Grid';
import { $$names, RowHeadCell } from '../routes/controls';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DynamicNewRoute } from './DynamicNewRoute';
import { usePreventDefault } from '../hooks/usePreventDefault';
import { File$, initial } from '../routes/data/files/fileInfo';
import config from './../../../config.json';
import { setPropertyByPath } from '../../common/object/setPropertyByPath';
import { SimpleInput } from '../routes/controls/SimpleInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationSquare, faFileUpload, faTicketSimple } from '@fortawesome/pro-solid-svg-icons';
import * as crypto from 'crypto';
import * as fs from 'graceful-fs';
import { UpdateMode } from 'realm';
import { isEmptyOrNull } from '../util/asPercentage';
import { SimpleLookup } from '@controls/SimpleLookup';
import { Lot } from '../routes/data/auctions/lot';
import { faSquareCheck, faSquareDashed, faSquareQuestion } from '@fortawesome/pro-duotone-svg-icons';
import { toDate } from './toDate';
import { GridRoute, RouteBase } from '../viewport/routeBase';

type View = React.FunctionComponent<{
    realm: Realm;
}>;
type InsertView<T> = React.FunctionComponent<{
    realm: Realm;
    type: string;
    initial: () => T;
}>;

export function EditForm({ realm }: { realm: Realm }) {
    const { id } = useParams();
    return (
        <div>
            <span>{id}</span>
        </div>
    );
}

export function DynamicRouteBase({ realm }: { realm: Realm }) {
    console.log('DynamicRouteBase');
    const { type } = useParams();
    console.log(`type`, type);
    const $type = type ?? '';
    useEffect(() => {
        console.log('registering...', $type);
        JITTRegistrar.addInsert($type, $reference[$type].initial, $reference[$type].convertTo, $reference[$type].children, $grid[$type]!.GridHeaders, $grid[$type].TableRow as any, $grid[$type].sort);
    }, [$type]);
    return (
        <NewEmbeddedContext realm={realm} type={type ?? ''}>
            <Outlet />
        </NewEmbeddedContext>
    );
}
export function DynamicGrid({ realm }: { realm: Realm }) {
    const { type } = useParams();
    return <Grid typeName={type ?? ''} realm={realm} {...$grid[type ?? '']} />;
}

// FIXME Fix index route to display grid element.

export function toRouting(realm: Realm) {
    return <Route path=':type' element={<RouteBase realm={realm} />}>
        <Route path='new' element={<></>}></Route>
        <Route path=':id' element={<></>}></Route>
        <Route index element={<GridRoute realm={realm} />}></Route>
    </Route>;
}
export function toRoute(realm: Realm) {
    return (
        <Route path=':type' element={<DynamicRouteBase realm={realm} />}>
            <Route path='new' element={<DynamicNewRoute realm={realm} />} />
            <Route path=':id' element={<EditForm realm={realm} />} />
            <Route index element={<></>} />;
        </Route>
    );
    // return (
    //     <Route path=':type' element={<DynamicRouteBase realm={realm} />}>
    //         <Route path='new' element={<DynamicNewRoute realm={realm} />} />
    //         <Route path=':id' element={<EditForm realm={realm} />} />
    //         <Route index element={<DynamicGrid realm={realm} />} />
    //     </Route>
    // );
}

export function DataViewer({
    Headers,
    Actions,
    Body
}: {
    Actions: React.FunctionComponent<{ info: TypeData; children: Children }>;
    Headers: React.FunctionComponent<{ info: TypeData }>;
    Body: React.FunctionComponent<{ info: TypeData; data?: Realm.Object }>;
}) {
    const { type } = useParams();
    const info = useMemo(() => global.getTypeInfo(type ?? ''), []);
    return (
        <div className='w-full h-full'>
            <Headers info={info} />
            <Actions info={info}>
                <Body info={info} />
            </Actions>
        </div>
    );
}

export function GridContainer({ children, info }: { children: Children; info: TypeData }) {
    return <>{children}</>;
}

export function GridCell({ data, name, columnData }: { name: string; data: Realm.Object & Record<string, any>; columnData: ColumnData }) {
    const {
        elementType,
        format,
        type: [_isOptional, dataType, objectType]
    } = columnData;
    const value = useMemo(() => (format ? eval(format)(data[name]) : data[name]), []);
    switch (elementType) {
        case 'input':
            return <td>{value}</td>;
        case 'select': {
            if (dataType === 'linkingObjects') {
                return <td>{value.length}</td>;
            }
            return <td>{value}</td>;
        }
        case 'fieldset': {
            const info = global.getTypeInfo(objectType ?? '');
            return <GridMultiCell info={info} data={value} />;
        }
    }
}
export function GridMultiCell({ info, data }: { info: TypeData; data: Realm.Object & Record<string, any> }) {
    const { fields } = info;
    return (
        <>
            {Array.from(fields.entries()).map(([k, v]) => (
                <GridCell key={v.index} name={k} columnData={v} data={data} />
            ))}
        </>
    );
}
export function GridRow({ info, data }: { info: TypeData; data: Realm.Object & Record<string, any> }) {
    return (
        <tr>
            <GridMultiCell info={info} data={data} />
        </tr>
    );
}
export function UnwrappedHeaders({ info }: { info: TypeData }): JSX.Element {
    return (
        <>
            {Array.from(info.fields.entries())
                .map(([k, v]) => ({ name: k, ...v }))
                .sort((x) => x.index)
                .map((x) => (x.elementType === 'fieldset' ? <UnwrappedHeaders info={global.getTypeInfo(x.type[2] ?? 'n/a')} /> : <th>{x.displayName}</th>))}
        </>
    );
}
export function GridHeaders({ info }: { info: TypeData }) {
    return (
        <tr>
            <UnwrappedHeaders info={info} />
        </tr>
    );
}
export function FileHeaders() {
    return (
        <tr>
            <th>ID</th>
            <th>File Type</th>
            <th>File Name</th>
            <th>Mime Type</th>
            <th>URI</th>
            <th>Size</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Hash</th>
            <th>Links</th>
            <th>Is Unassigned</th>
            <th>Linked Lots</th>
        </tr>
    );
}

const sizeUnit: Record<string, string> = {
    '0': 'byte',
    '1': 'kB',
    '2': 'mB',
    '3': 'gB',
    '4': 'tB'
};
export function convertSize(n: number): string {
    function inner(n: number, unit = 0): [number, string] {
        if (n < 1) {
            return [n / 0.001, sizeUnit[(unit - 1).toString()]];
        }
        if (n < 1000) return [n, sizeUnit[unit.toString()]];
        return inner(n * 0.001, unit + 1);
    }
    const res = inner(n, 0);
    return res[0]
        .toFixed(3 - res[0].toString().split('.')[0].length)
        .concat(' ')
        .concat(res[1]);
}

console.log(convertSize(293242));
console.log(convertSize(2933233242));

export function FileRow({ data, index }: { index: number; data: File$ & Realm.Object }) {
    return (
        <tr key={index} data-id={data._id.toHexString()}>
            <RowHeadCell data={data} scope='row' />
            <td>{data.itemType}</td>
            <td>{data.location.filename}</td>
            <td>{data.mimeType}</td>
            <td>{data.toUri}</td>
            <td>{convertSize(data.size)}</td>
            <td>{toDate(data.createDate)}</td>
            <td>{toDate(data.modifiedDate)}</td>
            <td title={data.hash} className='mx-auto text-center align-center'>
                <FontAwesomeIcon icon={faTicketSimple} size='lg' />
            </td>
            <td>
                <table className='text-base font-medium font-firaSans'>
                    <thead>
                        <tr>
                            <th>ItemId</th>
                            <th>LotID</th>
                            <th>InvoiceId</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>n/a</td>
                            <td>{data.ids.lotId ?? ''}</td>
                            <td title='invoiceId'>{data.ids.invoiceId ?? ''}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td className='mx-auto text-center align-center'>
                {data.itemType == null || data.itemType.length === 0 ? (
                    <FontAwesomeIcon icon={faExclamationSquare} size='2x' className='text-2xl font-extrabold text-magenta accent-red' />
                ) : data.isUnassigned == true ? (
                    <FontAwesomeIcon icon={faSquareDashed} size='2x' className='text-2xl font-extrabold text-red bg-orange/50' />
                ) : data.isUnassigned == false ? (
                    <FontAwesomeIcon icon={faSquareCheck} size='2x' className='text-2xl font-extrabold text-emerald-dark bg-lime-dark/50' />
                ) : (
                    <FontAwesomeIcon icon={faSquareQuestion} size='2x' className='text-2xl font-extrabold bg-black text-amber-dark' />
                )}
            </td>
            <td>{data.lotId == null ? '0' : '1'}</td>
        </tr>
    );
}
export function FileGrid({ realm }: { realm: Realm }) {
    const objs = realm.objects<File$>($$names.files.file);
    // const fixes = objs.filter((x) => x.lotId != null && x.ids.lotId == null);
    // useEffect(() => {
    //     if (fixes.length > 0) {
    //         realm.write(() => {
    //             fixes.forEach((x) => (x.ids.lotId = x.lotId._id.toHexString()));
    //             fixes.forEach((x) => (x.isUnassigned = false));
    //         });
    //     }
    // }, [fixes, realm]);
    return (
        <Grid
            realm={realm}
            typeName={$$names.files.file}
            sort={[
                ['itemType', false],
                ['_id', false]
            ]}
            GridHeaders={FileHeaders}
            TableRow={FileRow}></Grid>
    );
}
export function useUpdater(item: globalThis.File | null, setField: (name: string, value: any) => void, name: string, action: (i: globalThis.File) => any, ...deeps: any[]) {
    useEffect(() => {
        if (item != null) {
            setField(name, action(item));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item, name, ...deeps]);
}
export function FileUpload({ realm }: { realm: Realm }) {
    const { root, uploads, invoices } = config.files;
    const src = useRef('');
    const [item, setItem] = useState<globalThis.File | null>(null);
    const [formData, setFormData] = useState(initial);
    const [lotId, setLotId] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [productId, setProductId] = useState('');
    const [itemId, setItemId] = useState('');
    const [itemType, setItemType] = useState('');
    const setField = useCallback((name: string, value: any) => {
        setFormData((prev) => setPropertyByPath(name, prev, value));
    }, []);
    useEffect(() => {
        if (item != null) {
            item.arrayBuffer().then((d) => setField('data', d));
            src.current = URL.createObjectURL(item);
            return () => {
                URL.revokeObjectURL(src.current);
                src.current = '';
            };
        }
    }, [item, setField]);
    useEffect(() => {
        if (item != null) {
            if (item.type === 'application/pdf' && itemType !== 'invoice') {
                setItemType('invoice');
            }
        }
    }, [item, itemType]);
    useUpdater(item, setField, 'mimeType', (i) => i.type);
    useUpdater(item, setField, 'size', (i) => i.size);
    useUpdater(item, setField, 'createDate', (i) => fs.statSync(i.path).birthtime);
    useUpdater(item, setField, 'modifiedDate', (i) => new Date(i.lastModified));
    useUpdater(item, setField, 'location.drive', () => '');
    useUpdater(item, setField, 'itemType', () => itemType);
    useEffect(() => {
        const fn = eval(invoices)(lotId, invoiceId);
        setField('location.filename', fn);
    }, [invoiceId, invoices, item, lotId, setField]);
    useEffect(() => {
        if (formData.data != null) {
            const d = formData.data;
            const cryptoHash = crypto.createHash('sha256');
            const hash = cryptoHash.update(d.toString()).digest('hex');
            console.log('setting hash');
            console.log(hash);
            setField('hash', hash);
        }
    }, [formData.data, setField]);
    useEffect(() => {
        if (itemType != '') {
            setField('location.folder', [root, uploads, itemType].join('/'));
        } else {
            setField('location.folder', [root, uploads].join('/'));
        }
    }, [itemType, root, setField, uploads]);

    const onSelect = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const el: HTMLInputElement = ev.target as any;
        const item = el.files?.[0];
        if (item == null) return;
        setItem(item);
        // setFormData(prev => {
        //     ;
        //     return {...prev, _id: new ObjectId(), modifiedDate: new Date(lastModified), mimeType: type, size: size, location: {
        //         drive: '',
        //         folder: [root, uploads].join('/'),
        //         filename: nodePath.basename(path)
        //     },
        //     data: b,
        //     hash:
        //     } as File;
        // });

        // fs.promises.rename(item.path, dto.toUri).then(x => {

        // })
    };
    const isInvoice = useCallback(() => itemType === 'invoice', [itemType]);
    const isPhoto = useCallback(() => itemType === 'photo', [itemType]);
    const isReceipt = useCallback(() => itemType === 'receipt', [itemType]);
    const isProductDoc = useCallback(() => itemType === 'document', [itemType]);
    const isShpping = useCallback(() => itemType === 'shipping', [itemType]);
    const nav = useNavigate();

    const onClick = () => {
        realm.write(() => {
            const fd = { ...formData, itemType, isUnassigned: true, ids: {} as Record<string, string> };
            console.log(`fd`, fd);
            if (!isEmptyOrNull(lotId)) fd.ids.lotId = lotId;
            if (!isEmptyOrNull(invoiceId)) fd.ids.invoiceId = invoiceId;
            if (!isEmptyOrNull(itemId)) fd.ids.itemId = itemId;
            if (!isEmptyOrNull(productId)) fd.ids.productId = productId;
            if (!isEmptyOrNull(lotId)) fd.isUnassigned = false;
            console.log('fd', fd);
            const _id = realm.create<File$>($$names.files.file, fd as any, UpdateMode.Modified);
            console.log(_id);
            nav(_id._id.toString());
            const oldPath = item?.path;
            console.log(`move file from: ${oldPath ?? ''} to: ${fd.toUri} `);
        });
    };
    const prevent = usePreventDefault();
    return (
        <form id='file-upload' className='flex flex-col justify-between w-full h-full space-x-3 space-y-1' onSubmit={prevent} onReset={prevent}>
            <label className='flex w-full ml-3 text-2xl font-bold font-firaSans' htmlFor='file-input' id='file-input-label'>
                File Uploader
            </label>
            <div className='flex flex-row'>
                <div className='flex flex-1'>
                    <input
                        type='file'
                        id='file-input'
                        name='file-uploader'
                        className='flex items-center justify-center file:rounded-lg file:shadow-lg file:border file:border-blue file:bg-black file:font-extrabold file:text-blue'
                        onChange={onSelect}
                    />
                </div>
                <button type='button' className='flex flex-1 bg-black text-white p-0.5 rounded-lg items-center justify-center mx-2 border-2 border-cyan shadow-xl my-0.5 shadow-sky' onClick={onClick}>
                    <span className='flex flex-row'>
                        Upload
                        <FontAwesomeIcon className='flex w-8 h-8 ml-2' icon={faFileUpload} size='lg' />
                    </span>
                </button>
                <select
                    name='file-type'
                    id='file-type-select'
                    className='flex flex-1 control'
                    value={itemType}
                    placeholder='Unknown'
                    onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
                        setItemType(ev.target.value);
                    }}>
                    <option value='' label='Select a file type...' />
                    <option value='invoice' label='Invoice' />
                    <option value='photo' label='Photo' />
                    <option value='receipt' label='Receipt' />
                    <option value='document' label='Product Documentation' />
                    <option value='shipping' label='Shipping Label' />
                </select>
            </div>
            <div className='flex flex-row w-full space-x-5'>
                {isPhoto() && <SimpleInput name='item-id' value={itemId} setValue={setItemId} className='flex flex-1' displayName='Item ID' />}
                {isInvoice() && <SimpleInput name='invoice-id' value={invoiceId} setValue={setInvoiceId} className='flex flex-1' displayName='Invoice ID' />}
                {isInvoice() && (
                    <SimpleLookup lookup={$$names.auctions.lot} name={'lot-dropdown'} value={lotId} setValue={setLotId} optionLabel={(x: Lot) => x.name} realm={realm} displayName={'Auction Lot'} />
                )}
                {/* {isInvoice() && <SimpleInput name='lot-id' value={lotId} setValue={setLotId} displayName='Lot ID' className='flex flex-1' />} */}
            </div>
            <div className='flex flex-grow invisible'></div>
            <div className='flex w-full p-2 px-8 transition-all opacity-100 bg-pink-light h-1/2 place-self-end peer-empty:opacity-40 empty:opacity-20 '>
                {src.current != '' && <iframe title='PDF' width='90%' height='90%' src={src.current} className='flex items-center justify-center object-cover group-empty:hidden' />}
            </div>
        </form>
    );
}
