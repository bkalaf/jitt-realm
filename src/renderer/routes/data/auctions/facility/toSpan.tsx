export function toSpan(span?: number) {
    switch (span) {
        case undefined:
            return [];
        case 1:
            return [];
        case 2:
            return ['col-span-2'];
        case 3:
            return ['col-span-3'];
        case 4:
            return ['col-span-4'];

        default:
            return [];
    }
}
