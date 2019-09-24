import {
    createJWToken,
    getParameters,
    IJwtTokenResult,
    NextFunction,
    Request,
    response,
    Response
} from "@blendsdk/express";
import { RouteController } from "@blendsdk/webapi-service";
import { validateUser } from "../services/authentication";
import { IApiAuthenticationRequest } from "../types";

/**
 * Interface describing the JWT config parameters
 *
 * @interface IConfig
 */
interface IConfig {
    JWT_MAX_AGE: number;
    JWT_SECRET: string;
}

/**
 * Validates the user and provides a JWT authentication token.
 *
 * @export
 * @class LoginController
 * @extends {RouteController}
 */
export class LoginController extends RouteController {
    /**
     * @override
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} [_next]
     * @returns
     * @memberof LoginController
     */
    public async handleRequest(req: Request, res: Response, _next?: NextFunction) {
        try {
            const { loggerService, configService } = this.services,
                params = getParameters<IApiAuthenticationRequest>(req),
                vUser = await validateUser(params.username, params.password);
            if (!vUser.error) {
                const maxAge = (configService.getConfig<IConfig>().JWT_MAX_AGE as any) || 2592000;
                loggerService.debug("TOKEN_ASSIGNED", vUser);
                return response(res).OK<IJwtTokenResult>({
                    success: true,
                    token: createJWToken(
                        {
                            maxAge,
                            sessionData: vUser.user
                        },
                        {
                            JWT_MAX_AGE: maxAge,
                            JWT_SECRET: configService.getConfig<IConfig>().JWT_SECRET || "test2"
                        }
                    )
                });
            } else {
                return response(res).unAuthorized(vUser.error);
            }
        } catch (err) {
            return response(res).serverError(err);
        }
    }
}
