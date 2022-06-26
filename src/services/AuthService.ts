import { AuthApi, CreateUserType } from '../api/authApi';
import { Dispatch, RootStateType } from '../store';
import { hasApiError } from '../helpers/hasApiError';

export async function createUser(dispatch: Dispatch<RootStateType>, data: CreateUserType) {
    try {
        const response = await AuthApi.create(data);

        if (hasApiError(response)) {
            return;
        }

        dispatch({ user: {} });
    } catch (e) {
        console.error(e);
    } finally {

    }
}
