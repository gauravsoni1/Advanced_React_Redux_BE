import sharedConfig from "../config/shared.config";
import { ApiResponse } from "../utility/apiResponse";
import { CustomError, ErrorMap } from "../utility/customError";
import * as jwt from 'jsonwebtoken';
import { isTokenValid } from "../utility/shared";

export const authenticateRequest = (req, resp, next) => {
    try {
        // Valiate the request , check for the token
        const token = req.get("token");
        if (!token || !isTokenValid(token)) {
            throw new CustomError(ErrorMap.FORBIDDEN);
        }

        const tokenData = jwt.decode(token) as any;
        req.usr_id = tokenData.usr_id;
        req.org_id = tokenData.org_id;
        req.usr_role = tokenData.usr_role;

        next();
    } catch (error) {
        const apiResp = ApiResponse.error(error);
        resp.status(apiResp.status).json(apiResp);
    }
}