import { CustomError } from "./customError";

export class ApiResponse {
    private message: string;
    public status: number;
    private data: any;
    private errorCode: string;

    constructor(data: any, errorCode: string, status: number, message: string) {
        this.data = data;
        this.errorCode = errorCode;
        this.status = status;
        this.message = message;
    }

    static success(data: any, status: number, message: string) {
        return new ApiResponse(data, null, status, message);
    }

    static error(error) {
        if (error instanceof CustomError) {
            return new ApiResponse(null, error.code, error.status, error.message);
        } else {
            return new ApiResponse(null, "GENERAL_ERROR", 500, "Internal error occured");
        }
    }
}