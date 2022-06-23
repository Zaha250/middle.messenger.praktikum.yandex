import BaseApi from './baseApi';
import { HTTP } from '../core';

const AuthApiInstance = new HTTP('/auth');

export type CreateUserType = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export class AuthApi extends BaseApi {
    create(data: CreateUserType) {
        return AuthApiInstance.post('/signup', data);
    }
}
