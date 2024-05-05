import { Response } from "express";

export enum ErrorTypes {
    INVALID_SIGNIN = 'INVALID_SIGNIN',
    USER_NOT_FOUND = 'USER_NOT_FOUND'
}

export type APIResponseData = {
    data: any,
    error?: ErrorTypes | null,
    message?: string
}

class APIResponse {
    static done(res: Response,data: APIResponseData){
        try {

        } catch (error) {
            res.status(500).send(error);
        }
    }

    static error(res, err: Error){

    }
}