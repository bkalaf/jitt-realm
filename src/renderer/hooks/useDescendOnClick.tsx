import { useGoToPageOnClick } from "./useGoToPageOnClick";

export function useDescendOnClick() {
    return useGoToPageOnClick('..');
}
