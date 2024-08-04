import sharedConfig from "../config/shared.config";
import { ApiResponse } from "../utility/apiResponse";
import { CustomError, ErrorMap } from "../utility/customError";
import * as jwt from 'jsonwebtoken';
import { isTokenValid } from "../utility/shared";

export const fingerprintCheck = (req, resp, next) => {
    try {
        // Valiate the request , check for the token
        const token = req.get("token");
        const currentFingerprint = req.get("fingerprint")

        if (!token || !isTokenValid(token)) {
            throw new CustomError(ErrorMap.FORBIDDEN);
        }

        const tokenData = jwt.decode(token) as any;
        const jwtFingerprint = tokenData.fingerprint;

        if (jwtFingerprint != currentFingerprint) {
            throw new CustomError(ErrorMap.FORBIDDEN);
        }

        next();
    } catch (error) {
        const apiResp = ApiResponse.error(error);
        resp.status(apiResp.status).json(apiResp);
    }
}