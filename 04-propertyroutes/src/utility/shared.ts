import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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