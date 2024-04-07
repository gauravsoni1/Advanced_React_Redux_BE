export const ErrorMap = {
    "USER_EXIST": { message: "User already exist", status: 400, code: "USER_EXIST" },
    "INVALID_SIGNIN": { message: "Invalid Signin", status: 400, code: "INVALID_SIGNIN" }
}

export class CustomError extends Error {
    code: string;
    status: number;

    constructor({ message, status, code }) {
        super(message);
        this.code = code;
        this.status = status;
    }
}