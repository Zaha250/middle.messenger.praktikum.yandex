import {HTTP} from "core";
import {APIError, UserDTO} from "./types";
import {TRequestOptions} from "core/HTTP";

const UserApiInstance = new HTTP('/user');

const options: TRequestOptions = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
}

export const UserApi = {
    changeProfile: (data: Omit<UserDTO, 'id' | 'avatar'>) => {
        return UserApiInstance.put<UserDTO | APIError>('/profile', {...options, data: JSON.stringify(data)})
    },
    changeAvatar: (data: Blob) => {
        return UserApiInstance.put<UserDTO | APIError>('/profile/avatar', {...options, data: JSON.stringify(data)})
    },
    changePassword: (data: {oldPassword: string, newPassword: string}) => {
        return UserApiInstance.put<string | APIError>('/password', {...options, data: JSON.stringify(data)})
    }
}