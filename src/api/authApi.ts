import { HTTP } from 'core';
import { TRequestOptions } from 'core/HTTP';
import { APIError, UserDTO } from './types';

const AuthApiInstance = new HTTP('/auth');

export type CreateUserType = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

type LoginRequestDataType = {
    login: string;
    password: string;
};

const options: TRequestOptions = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

export const AuthApi = {
    create: (data: CreateUserType) => AuthApiInstance.post<{ id: number } | APIError>(
        '/signup',
        { data: JSON.stringify(data), ...options },
    ),
    login: (data: LoginRequestDataType) => AuthApiInstance.post<string | APIError>(
        '/signin',
        { data: JSON.stringify(data), ...options },
    ),
    logout: () => AuthApiInstance.post<string | APIError>('/logout', { ...options }),
    me: () => AuthApiInstance.get<UserDTO | APIError>('/user', { ...options }),
};
