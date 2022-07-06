export function getQueryParam(param: string) {
    const url = window.location.search;
    const vars: Record<string, any> = {};
    // @ts-ignore
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => {
        vars[key] = value;
    });
    return vars[param];
}
