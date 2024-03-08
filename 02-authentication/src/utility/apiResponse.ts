export enum StatusCodes {
    NOT_FOUND = 404,
    CREATED = 201,
    OK = 200,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}


export class ApiResponse {
    private message: string;
    private data: any;
    private status: number;

    constructor(message: string, data: any, status: number) {
        this.message = message;
        this.data = data;
        this.status = status;
    };

    response() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        }
    }
}