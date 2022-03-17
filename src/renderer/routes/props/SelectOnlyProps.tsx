import { AdjustedDropDownIDs } from '../../hooks/useAdjustNames';
import { ControlOnlyProps } from './ControlOnlyProps';

export type SelectOnlyProps<T> = {
    lookup?: string | Record<string, string>;
} & ControlOnlyProps<T> & AdjustedDropDownIDs;
