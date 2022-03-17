import { HTMLInputTypeAttribute } from 'react';
import { AdjustedInputIDs } from '../../hooks/useAdjustNames';
import { ControlOnlyProps } from './ControlOnlyProps';

export type InputOnlyProps<T> = {
    type: HTMLInputTypeAttribute;
    readOnly?: boolean;
} & ControlOnlyProps<T> & AdjustedInputIDs;
