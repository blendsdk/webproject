import { getParameters } from "@blendsdk/express";
import { IDictionary } from "@blendsdk/stdlib";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Application } from "../../application/Application";
import { MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE } from "../constants";
import { decryptData, encryptData } from "./Encryption";
import { IJWTConfig } from "./Types";

/**
 * Randomly generated token key
 */
export const TOKEN_KEY: string = Math.random()
    .toString(12)
    .substring(2);

/**
 * Create and encode data as JWT
 *
 * @export
 * @param {IJWTData} details
 * @returns {string}
 */
export function createJWToken(details: IDictionary, config?: IJWTConfig): string {
    // tslint:disable-next-line: radix
    delete details.password; // in case!
    const secret = getJWTSecret(config);
    return encryptData(
        jwt.sign(
            {
                data: details || {}
            },
            secret,
            {
                expiresIn: config.JWT_EXPIRES_IN_SECONDS || 3600,
                algorithm: "HS256"
            }
        ),
        secret
    );
}

/**
 * Get the JWT_SECRET provided from the .env file.
 *
 * @returns {string}
 */
function getJWTSecret(config: IJWTConfig): string {
    if (config.JWT_SECRET) {
        return config.JWT_SECRET;
    } else {
        console.log("WARNING: NO JWT TOKEN WAS FOUND FROM THE CONFIGURATION!");
        return process.cwd();
    }
}

/**
 * Verify a JWT against a configures secret.
 *
 * @export
 * @param {string} token
 * @returns
 */
export function verifyJWTToken(token: string, config: IJWTConfig) {
    const secret = getJWTSecret(config);
    return new Promise((resolve, reject) => {
        jwt.verify(decryptData(token, secret), secret, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

/**
 * Gets the current authenticated user
 *
 * @export
 * @template T
 * @param {Request} req
 * @returns
 */
export function getAuthenticatedUser<T>(req: Request) {
    return ((req as any).user || undefined) as T;
}

/**
 * Gets the currently assigned token.
 *
 * @export
 * @param {Request} req
 * @param {string} [key]
 * @returns
 */
export function getToken(req: Request, key?: string) {
    key = key || TOKEN_KEY;
    const params = getParameters<any>(req) || {};
    return params.TOKEN || params[TOKEN_KEY] || (req.cookies && req.cookies[TOKEN_KEY]) || undefined;
}

/**
 * Token authentication provide module.
 *
 * @export
 * @param {Application} app
 * @returns
 */
export function AuthenticationProvider(app: Application) {
    return {
        id: MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE,
        module: (req: Request, res: Response, next: NextFunction) => {
            verifyJWTToken(getToken(req), app.getConfig())
                .then((decodedToken: any) => {
                    (req as any).user = decodedToken.data.user;
                    next();
                })
                .catch(() => {
                    res.status(400).json({ message: "Invalid auth token provided!!" });
                });
        }
    };
}
