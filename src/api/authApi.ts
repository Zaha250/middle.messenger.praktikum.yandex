import { HTTP } from '../core';
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

export const AuthApi = {
    create: (data: CreateUserType) => AuthApiInstance.post<User>('/signup', data),
    login: (data: LoginRequestDataType) => AuthApiInstance.post<string | APIError>('/signin', data),
    logout: () => AuthApiInstance.post<string | APIError>('/logout'),
    me: () => AuthApiInstance.get<UserDTO | APIError>('/user'),
};
