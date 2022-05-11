import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { LoginData, RegisterData, NextFunction } from '../../types';
import { BzlError } from './BzlError';
import { Factory } from '../../factory';
import { config } from './../../config';

const tokenSecretKey = config.auth.secret.auth;
const emailSecretKey = config.auth.secret.email;

interface TokenPayload {
    readonly subject: string,
    readonly role: string,
    readonly isMaster: boolean
}
// tslint:disable: no-unsafe-any
export const loginUser = (data: LoginData, next: NextFunction) => {
    const filter = { email: data.email, role: data.app };
    const password = data.password;
    const Model = Factory.getInstance().getModels().getUserModel();
    return Model.findOne(filter, (error, user) => {
        if (error) return next(BzlError.InteralError(error));
        if (!user) return next(BzlError.NodataFound());
        if (!user.emailConfirmation) return next(BzlError.UnauthorizedError('email must be confirmed'));

        //check if passwords match
        if (password === Factory.getInstance().getPasswordCypher().decrypt(user.password)) {
            const response = {
                _id: user._id,
                expiresIn: '10h'
            };
            //create token
            const payload: TokenPayload = { subject: user._id, role: user.role, isMaster: user.isMaster };
            const token = jwt.sign(payload, tokenSecretKey, { expiresIn: '10h' });

            return next(null, _.extend({}, response, { token: token }));
        }
        else return next(BzlError.Unauthorized());
    });

}

export const registerUser = (data: RegisterData, next: NextFunction) => {
    const filter = { email: data.email };
    const Model = Factory.getInstance().getModels().getUserModel();
    //check if already exists an user with this cresentials
    return Model.findOne(filter, (error, user) => {
        if (error) return next(BzlError.InteralError(error));
        if (!user) {
            const encryptedPassword = Factory.getInstance().getPasswordCypher().encrypt(data.password);
            const newUser = new Model(_.extend({}, data, { password: encryptedPassword }));
            return newUser.save().then(() => {
                const tokenEemail = jwt.sign({ subject: newUser._id }, emailSecretKey,
                    { expiresIn: '10h' });
                const app = data.role === 'admin' ? 'Abstract Web System Admin' : 'Online Store';
                Factory.getInstance().getMailer().sendConfirmationEmail(tokenEemail, newUser.email, newUser.firstName, app, (mailError) => {
                    if (mailError) {
                        console.log(mailError);
                        //delete the new created user due to email error
                        return Model.deleteOne({ _id: newUser.id }, (err) => {
                            if (err) return next(BzlError.InteralError(err.toString()));
                            return next(mailError);
                        });
                    }
                    return next(null, _.pick(newUser, ['_id', 'firstName', 'lastName', 'email']));
                });
            });
        }
        else return next(BzlError.Collision());
    });
}

export const emailConfirmation = (token: string, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getUserModel();
    if (!token) return next(BzlError.UnauthorizedError('Token missing'));
    try {
        const payload: TokenPayload = jwt.verify(token, emailSecretKey) as TokenPayload;

        if (!payload) return next(BzlError.UnauthorizedError('Payload missing'));

        const userid = payload.subject;

        return Model.updateOne({ _id: userid }, { emailConfirmation: true }, (error, mongores) => {
            if (error) return next(BzlError.InteralError(error));

            if (mongores.nModified === 0) return next(BzlError.NodataFound());

            const res = {
                redirect: `${config.services.admin.protocol}://${config.services.admin.hostname}:${config.services.admin.port}/`
            };

            return next(null, res);
        });
    } catch (error) {
        return next(BzlError.InteralError(error.toString()));
    }
}