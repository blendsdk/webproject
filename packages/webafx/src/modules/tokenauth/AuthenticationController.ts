import { getParameters, Request, Response, response } from "@blendsdk/express";
import { IDictionary } from "@blendsdk/stdlib";
import { IRuntimeConfig } from "../configuration/Types";
import { getApplication } from "../routebuilder";
import { createJWToken, getAuthenticatedUser, TOKEN_KEY } from "./Jwt";

export interface IUserValidatorResult {
    error: string | Error;
    user: IDictionary;
}

export type TUserValidator = (params: IDictionary) => Promise<IUserValidatorResult>;

export interface IAuthenticationRequest {
    username: string;
    password: string;
    language?: string;
}

/**
 * Interface for returning the token to the requester
 *
 * @export
 * @interface IJwtTokenResult
 */
export interface IJwtTokenResult {
    success: true;
    exp: number;
}

/**
 * Simple controller method retuning the curentlly authenticated user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export async function CredentialsController(req: Request, res: Response) {
    return response(res).OK(getAuthenticatedUser(req));
}

export function AuthenticationController(userValidator: TUserValidator) {
    return async (req: Request, res: Response) => {
        const app = getApplication(req),
            config = app.getConfig<IRuntimeConfig>(),
            logger = app.getLogger(),
            cookieExp = new Date();

        try {
            const vUser = await userValidator(getParameters(req)),
                expInSeconds = config.JWT_EXPIRES_IN_SECONDS || 30 * 60;

            if (!vUser.error) {
                logger.debug("TOKEN_ASSIGNED", { ...vUser });

                // Force the password to be undefined
                (vUser.user as any).password = undefined;

                cookieExp.setSeconds(cookieExp.getSeconds() + expInSeconds);
                const exp = cookieExp.getTime() - 60000;

                const token = createJWToken(
                    {
                        user: vUser.user,
                        exp
                    },
                    {
                        JWT_EXPIRES_IN_SECONDS: expInSeconds,
                        JWT_SECRET: config.JWT_SECRET
                    }
                );
                res.cookie(TOKEN_KEY, token, { httpOnly: true, expires: cookieExp });

                return response(res).OK<IJwtTokenResult>({
                    success: true,
                    // decrease 1 minute of the actual expiration time
                    // so we have time from the client to request a new token
                    exp
                });
            } else {
                cookieExp.setSeconds(cookieExp.getSeconds() - 1);
                res.cookie(TOKEN_KEY, "", { httpOnly: true, expires: cookieExp });
                logger.debug("AUTHENTICATION_FAILED", vUser);
                return response(res).unAuthorized(vUser.error);
            }
        } catch (err) {
            logger.error("EXCEPTION: ", err);
            return response(res).serverError(err);
        }
    };
}
