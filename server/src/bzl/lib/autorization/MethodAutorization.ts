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
        },
        order: {
            create: true,
            update: true,
            findById: true,
            queryAll: true,
            delete: true
        },
        image: {
            upload: true,
            findByRef: true,
            delete: true,
        },
        theme: {
            upload: false,
            add: false,
            findById: true,
            getDetails: true,
            delete: false,
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
        },
        order: {
            create: true,
            update: false,
            findById: true,
            queryAll: true,
            delete: false
        },
        image: {
            upload: false,
            findByRef: true,
            delete: false,
        },
        theme: {
            upload: false,
            add: false,
            findById: true,
            getDetails: false,
            delete: false,
        }
    }
}