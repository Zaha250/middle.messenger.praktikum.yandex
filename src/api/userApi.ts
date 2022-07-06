import { HTTP } from 'core';
import { TRequestOptions } from 'core/HTTP';
import { APIError, UserDTO } from './types';

const UserApiInstance = new HTTP('/user');

const options: TRequestOptions = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

export const UserApi = {
    changeProfile: (data: Omit<UserDTO, 'id' | 'avatar'>) => {
        return UserApiInstance.put<UserDTO | APIError>('/profile', { ...options, data: JSON.stringify(data) });
    },
    changeAvatar: (data: Blob) => {
        return UserApiInstance.put<UserDTO | APIError>('/profile/avatar', { ...options, data: JSON.stringify(data) });
    },
    changePassword: (data: { oldPassword: string, newPassword: string }) => {
        return UserApiInstance.put<string | APIError>('/password', { ...options, data: JSON.stringify(data) });
    },
    search: (login: string) => {
        return UserApiInstance.post<UserDTO[] | APIError>('/search', { ...options, data: JSON.stringify({ login }) });
    },
};
