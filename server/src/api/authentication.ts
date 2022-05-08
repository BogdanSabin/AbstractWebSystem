export const authAPI = {
    login: (data, next) => {
        console.log('Data', data);
        return next(null, { ok: true })
    },

    register: (data, next) => {
        console.log('Data', data);
        return next(new Error('test error').message)
    }
}