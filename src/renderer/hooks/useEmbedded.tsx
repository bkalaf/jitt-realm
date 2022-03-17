import { useContext } from 'react';
import { EmbeddedContext } from '../routes/providers/EmbeddedContext/index';

export function useEmbedded() {
    return useContext(EmbeddedContext)!;
}
