type StringIndexed = Record<string, any>;

export default function queryStringify (initialObj: StringIndexed): string | never {
    const reducer = (obj: StringIndexed, parentPrefix = null) => (prev: any, key: any) => {
        const val = obj[key];
        key = encodeURIComponent(key);
        const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key;

        if (val == null || typeof val === 'function') {
            prev.push(`${prefix}=`);
            return prev;
        }

        if (['number', 'boolean', 'string'].includes(typeof val)) {
            prev.push(`${prefix}=${encodeURIComponent(val)}`);
            return prev;
        }

        prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'));
        return prev;
    };

    return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&');
}