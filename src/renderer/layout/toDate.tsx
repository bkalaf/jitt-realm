export function toDate(d: Date) {
    return [(d.getMonth() + 1).toFixed(0).padStart(2, '0'), d.getDate().toString().padStart(2, '0'), d.getFullYear().toString().padStart(4, '0')].join('/');
}
