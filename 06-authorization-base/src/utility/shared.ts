import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import sharedConfig from '../config/shared.config';
import { CustomError, ErrorMap } from './customError';
import { uuid } from 'uuidv4';

export const encryptPassword = (password: string) => {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword
}

export const validatePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
}

export const generateJwt = (payload: any, jwtOptions: jwt.SignOptions) => {
    const jwtToken = jwt.sign(
        {
            ...payload
        }, "JWT_SECRET", jwtOptions
    )

    return jwtToken;
}

export const isTokenValid = (token: string) => {
    try {
        return jwt.verify(token, sharedConfig.jwt.secret, { issuer: sharedConfig.jwt.issuer })
    } catch (error) {
        throw new CustomError(ErrorMap.FORBIDDEN);
    }
}

export const getTokenData = (token: string) => {
    return jwt.decode(token);
}

export const generateOrgId = () => {
    return `org_${uuid()}`
}