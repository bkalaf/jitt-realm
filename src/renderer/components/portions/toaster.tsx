import { faBug, faThumbsDown, faThumbsUp, faTrafficCone } from '@fortawesome/pro-duotone-svg-icons';
import { faExclamation, faExclamationCircle, IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ObjectId } from 'bson';
import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { ignore } from '../../../common/ignore';
import { cn } from '../../util/cn';

export function Toaster() {
    const [toasts, setToasts] = useState<[ObjectId, JSX.Element][]>([]);
    const addToast = useCallback((title: string, body: string, icon: IconDefinition, iconBg: string, iconText: string) => {
        const newKey = new ObjectId();
        setToasts((prev) => [...prev, [newKey, <Toast oid={newKey} key={prev.length + 1} title={title} body={body} icon={icon} iconBg={iconBg} iconText={iconText} />]]);
    }, []);
    useEffect(() => {
        global.addToast = addToast;
    }, [addToast]);
    const destroyToast = useCallback((key: ObjectId) => {
        setToasts((prev) => prev.filter(([oid, toast]) => oid !== key));
    }, []);
    return (
        <div className='absolute top-0 z-40 w-1/5 h-full transform pointer-events-none left-2/3 p-0.5 px-2 flex space-y-1 flex-col-reverse'>
            {React.Children.toArray(toasts.map(([a, b]) => b)).map((el) => cloneElement(el as JSX.Element, { ...(el as JSX.Element).props, destroyToast }))}
        </div>
    );
}

export const createToasts = {
    info: (body: string) => addToast('INFOMATION', body, faExclamationCircle, 'bg-sky-dark', 'text-white'),
    warning: (body: string) => addToast('WARNING', body, faTrafficCone, 'bg-amber', 'text-white'),
    error: (body: string) => addToast('ERROR', body, faBug, 'bg-lime-dark', 'text-black'),
    success: (body: string) => addToast('SUCCESS', body, faThumbsUp, 'bg-green', 'text-white'),
    failure: (body: string) => addToast('FAILURE', body, faThumbsDown, 'bg-red', 'text-white')
};
export function Toast({
    destroyToast,
    title,
    body,
    icon,
    iconBg,
    iconText,
    oid
}: {
    icon: IconDefinition;
    title: string;
    body: string;
    iconText?: string;
    iconBg: string;
    destroyToast?: (oid: ObjectId) => void;
    oid: ObjectId;
}) {
    const iconCn = cn({ [iconBg]: true, [iconText ?? 'text-white']: true }, 'flex items-center w-16 h-16 text-white border border-white/50 justify center rounded-2xl');
    const [animating, setAnimating] = useState(true);
    const [disposed, setDisposed] = useState(false);
    const cb = useRef<NodeJS.Timeout | null>(null);
    const onClick = useCallback(() => {
        setDisposed(true);
    }, []);
    useEffect(() => {
        if (disposed) {
            if (cb.current) {
                clearTimeout(cb.current);
                cb.current = null;
            }
        }
    }, [disposed]);
    useEffect(() => {
        if (!animating && !disposed && cb.current == null) {
            cb.current = setTimeout(() => setDisposed(true), 14000);
            return () => (cb.current ? clearTimeout(cb.current) : ignore());
        }
    }, [animating, disposed]);
    const onAnimationEnd = useCallback(() => {
        if (animating) {
            setAnimating(false);
        } else {
            destroyToast ? destroyToast(oid) : ignore();
        }
    }, [animating, destroyToast, oid]);
    const className = cn(
        {
            fadeOutRight: disposed,
            bounceInDown: animating,
            [iconBg]: true,
            [iconText ?? 'text-white']: true
        },
        'flex flex-col w-full border-2 border-black divide-x-2 divide-y-2 divide-black shadow-xl rounded-xl pointer-events-auto bg-opacity-70'
    );
    return (
        <div role='button' tabIndex={0} className={className} onAnimationEnd={onAnimationEnd} onClick={onClick} onKeyDown={ignore}>
            <div className='flex flex-row items-center text-white bg-black/50 px-1 py-0.5'>
                <FontAwesomeIcon className={iconCn} icon={icon} size='lg' />
                <section className='flex flex-col flex-grow'>
                    <h1 className='flex items-center justify-center flex-grow w-full text-base font-extrabold text-white bg-black border border-black rounded-xl font-firaSans'>{title}</h1>
                    <p className='flex justify-start flex-grow w-full mx-2 text-sm text-left'>{body}</p>
                </section>
            </div>
        </div>
    );
}
