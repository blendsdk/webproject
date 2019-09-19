import { Request, Response } from "express";
import { response, createJWToken, IJwtTokenResult, getParameters } from "@blendsdk/express";
import { t } from "../../i18n";
import { validateUser } from "../../services/authentication";
import { IApiAuthenticationRequest } from "../../common/api_types";
/**
 * Validates the user and provides a JWT authentication token.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export async function loginController(req: Request, res: Response) {
    try {
        const params = getParameters<IApiAuthenticationRequest>(req);
        const vUser = await validateUser(params.username, params.password);
        if (!vUser.error) {
            return response(res).OK<IJwtTokenResult>({
                success: true,
                token: createJWToken({
                    sessionData: vUser.user,
                    maxAge: (process.env.JWT_MAX_AGE as any) || 2592000
                })
            });
        } else {
            return response(res).unAuthorized(t(vUser.error));
        }
    } catch (err) {
        return response(res).serverError(err);
    }
}
