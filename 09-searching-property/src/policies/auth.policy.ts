import sharedConfig from "../config/shared.config";
import { ApiResponse } from "../utility/apiResponse";
import { CustomError, ErrorMap } from "../utility/customError";
import * as jwt from 'jsonwebtoken';
import { isTokenValid } from "../utility/shared";
import { Permissions, permissionMap } from "../const/permissions";
import { forEach, includes, isEmpty } from "lodash";

export const authRequest = (requestedPermissions: Array<Permissions>) => {
    return (req, resp, next) => {
        try {

            const { usr_role } = req;
            const userPermissions = permissionMap[usr_role];
            let isAuthorized = true;

            if (isEmpty(userPermissions)) {
                isAuthorized = false;
            } else if (includes(userPermissions, "*")) {
                isAuthorized = true;
            } else {
                forEach(requestedPermissions, (perm) => {
                    if (!includes(userPermissions, perm)) {
                        isAuthorized = false;
                    }
                });
            }

            if (!isAuthorized) {
                throw new CustomError(ErrorMap.AUTH_FAILED);
            }
            next();
        } catch (error) {
            const apiResp = ApiResponse.error(error);
            resp.status(apiResp.status).json(apiResp);
        }
    }
}