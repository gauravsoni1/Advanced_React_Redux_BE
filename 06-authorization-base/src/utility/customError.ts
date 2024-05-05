export const ErrorMap = {
    "USER_EXIST": { message: "User already exist", status: 400, code: "USER_EXIST" },
    "INVALID_SIGNIN": { message: "Invalid Signin", status: 400, code: "INVALID_SIGNIN" },
    "AUTH_FAILED": { message: "User not authenticated", status: 401, code: "AUTH_FAILED" },
    "FORBIDDEN": { message: "User acccess is forbidden", status: 403, code: "FORBIDDEN" },
    "INVALID_INPUT": { message: "Request is invalid", status: 400, code: "INVALID_INPUT" },
    "PROPERTY_NOT_FOUND": { message: "Invalid property ID", status: 401, code: "PROPERTY_NOT_FOUND" },
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