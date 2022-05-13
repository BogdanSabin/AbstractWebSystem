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

export interface ChangePasswordData {
    readonly token: string,
    readonly code: string,
    readonly newPassword: string
}

export interface GetChangePasswordToken {
    readonly email: string,
    readonly app: string
}

export interface with_token {
    readonly token: string
}

export interface AutzContext extends with_token {
    readonly method?: string,
    readonly api?: string
}

export interface SiteData extends with_token {
    readonly name: string,
    readonly description?: string,
    readonly themeId: string
    readonly productsSettings: {
        readonly fields: readonly {
            readonly key: string,
            readonly type: string,
            readonly isMandatory: boolean
        }[]
    },
    readonly ordersSettings: {
        readonly fields: readonly {
            readonly key: string,
            readonly type: string,
            readonly isMandatory: boolean
        }[]
    }
}

export interface UpdateSiteData extends SiteData {
    readonly id: string
}

export interface IdData extends with_token {
    readonly id: string
}

export interface SiteQueryData extends with_token {
    readonly text?: string,
    readonly adminId?: string
}

export interface ProductData extends with_token {
    readonly siteId: string,
    readonly fields: readonly {
        readonly key: string,
        readonly value: string,
    }[]
}

export interface UpdateProductData extends with_token {
    readonly id: string
    readonly fields: readonly {
        readonly key: string,
        readonly value: string,
    }[]
}

export interface ProductQueryData extends with_token {
    readonly text?: string,
    readonly adminId?: string
    readonly siteId?: string
}