export interface BzlErrorResponse {
    readonly code: number,
    readonly message: string
}

export class BzlError {
    static NodataFound(): BzlErrorResponse {
        return {
            code: 404,
            message: 'No data Found'
        }
    }

    static Forbidden(): BzlErrorResponse {
        return {
            code: 403,
            message: 'Forbidden'
        }
    }

    static Collision(): BzlErrorResponse {
        return {
            code: 401,
            message: 'Collsion of fields in database'
        }
    }

    static Unauthorized(): BzlErrorResponse {
        return {
            code: 401,
            message: 'Unauthorized'
        }
    }

    static UnauthorizedError(error: string): BzlErrorResponse {
        return {
            code: 401,
            message: 'Unauthorized: ' + error
        }
    }

    static InteralError(error: string): BzlErrorResponse {
        return {
            code: 500,
            message: error
        }
    }

    static InvalidArgument(error: string): BzlErrorResponse {
        return {
            code: 500,
            message: 'Invalid argument: ' + error
        }
    }
}