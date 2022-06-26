import { APIError } from '../api/types';

export function hasApiError(response: any): response is APIError {
    return response && response.reason;
}
