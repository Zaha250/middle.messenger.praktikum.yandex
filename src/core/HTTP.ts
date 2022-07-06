import queryStringify from '../helpers/queryStringify';
import { logger } from 'handlebars';

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;

export type TRequestOptions = {
    method?: METHODS
    headers?: Record<string, string>
    timeout?: number
    data?: unknown
    withCredentials?: boolean
};

class HTTP {
    private readonly _parentPath: string;

    constructor(_parentPath: string = '') {
        this._parentPath = process.env.BASE_URL + _parentPath;
    }

    public get = <R>(url: string, options: TRequestOptions = {}): Promise<R> => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    public post = <R>(url: string, options: TRequestOptions = {}): Promise<R> => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    public put = <R>(url: string, options: TRequestOptions = {}): Promise<R> => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    public patch = <R>(url: string, options: TRequestOptions = {}): Promise<R> => {
        return this.request(url, { ...options, method: METHODS.PATCH });
    };

    public delete = <R>(url: string, options: TRequestOptions = {}): Promise<R> => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: TRequestOptions): any => {
        const {
            method = METHODS.GET,
            headers = {},
            data,
            timeout = 5000,
            withCredentials = false,
        } = options;

        const query = method === METHODS.GET ? queryStringify(data as TRequestData) : '';

        return new Promise((resolve, reject) => {
            const xhr = new window.XMLHttpRequest();

            xhr.open(method, this._parentPath + url + query);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            if (headers['Content-Type'] === 'application/json') {
                xhr.responseType = 'json';
            }

            xhr.onload = () => {
                resolve(xhr.response);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as any);
            }
        });
    };
}

export default HTTP;
