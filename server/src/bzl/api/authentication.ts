import { LoginData, NextFunction, RegisterData } from '../../types';
import { loginUser, registerUser, emailConfirmation } from '../lib/authentication';

export const authAPI = {
    login: (data: LoginData, next: NextFunction) => {
        console.log('Data', data);
        return loginUser(data, next);
    },

    register: (data: RegisterData, next: NextFunction) => {
        console.log('Data', data);
        return registerUser(data, next);
    },

    emailConfirmation: (token: string, next: NextFunction) => {
        console.log('Data', token);
        return emailConfirmation(token, next);
    }
}