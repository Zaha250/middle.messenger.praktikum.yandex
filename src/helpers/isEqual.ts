export default function isEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
    for (const prop in a) {
        if (a.hasOwnProperty(prop)) {
            if (b.hasOwnProperty(prop)) {
                if (typeof a[prop] === 'object') {
                    if (!isEqual(a[prop] as Record<string, unknown>, b[prop] as Record<string, unknown>)) return false;
                } else {
                    if (a[prop] !== b[prop]) return false;
                }
            } else {
                return false;
            }
        }
    }
    return true;
}