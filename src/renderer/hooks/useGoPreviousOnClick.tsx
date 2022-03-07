import { useGoToPageOnClick } from "./useGoToPageOnClick";

export function useGoPreviousOnClick() {
    return useGoToPageOnClick(-1);
}
