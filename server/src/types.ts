import { BzlError } from './bzl/lib/BzlError';

// tslint:disable-next-line: no-any
export type NextFunction = (error: BzlError, data?: any) => void

export interface LoginData {
    readonly email: string,
    readonly password: string,
    readonly app: string
}

export interface RegisterData {
    readonly firstName: string,
    readonly lastName?: string,
    readonly email: string,
    readonly phone?: string,
    readonly role: string,
    readonly password: string,
}