interface IChangeQueryParams {
    url?: string;
    mode: 'delete' | 'set';
    queryParam: string;
    value?: string;
}

export function modifyQueryParams({
    url = window.location.href,
    mode,
    queryParam,
    value,
}: IChangeQueryParams): void {
    const baseURL = new URL(url);

    switch (mode) {
    case 'delete':
        baseURL.searchParams.delete(queryParam);
        break;
    case 'set':
        if (value) {
            baseURL.searchParams.set(queryParam, value);
        }
        break;
    }

    window.history.replaceState(null, '', baseURL);
}
