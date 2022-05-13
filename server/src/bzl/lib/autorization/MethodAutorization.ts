export const registry = {
    admin: {
        site: {
            create: true,
            update: true,
            findById: true,
            queryAll: true,
            delete: true
        },
        product: {
            create: true,
            update: true,
            findById: true,
            queryAll: true,
            delete: true
        }
    },
    user: {
        site: {
            create: false,
            update: false,
            findById: false,
            queryAll: false,
            delete: false
        },
        product: {
            create: false,
            update: false,
            findById: true,
            queryAll: true,
            delete: false
        }
    }
}