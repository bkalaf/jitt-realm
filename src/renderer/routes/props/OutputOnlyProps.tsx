import { PartialAdjustedOutputIDs } from '../../hooks/useAdjustNames';
import { ControlOnlyProps } from './ControlOnlyProps';

export type OutputOnlyProps<T> = {
    calculated?: boolean;
} & ControlOnlyProps<T> & PartialAdjustedOutputIDs;
