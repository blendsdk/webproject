import { Request, Response, NextFunction, RequestHandler } from "express";
import { isArray, wrapInArray } from "@blendsdk/stdlib";
import { response, authenticatedUser } from "@blendsdk/express";
import { IAuthenticatedUser } from "../common/types";

/**
 * Check if the authenticated user has a given role
 *
 * @export
 * @param {(string | string[])} role
 * @returns {RequestHandler}
 */
export function has_role(role: string | string[]): RequestHandler {
    const builder = (roles: string[]): RequestHandler => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user: IAuthenticatedUser = authenticatedUser<IAuthenticatedUser>(req);
            if (user) {
                if (isArray(user.roles)) {
                    let check = false;
                    roles.forEach((r: string) => {
                        user.roles.forEach((i: string) => {
                            if (i === r || i === "ADMIN") {
                                check = true;
                            }
                        });
                    });
                    if (check) {
                        next();
                    } else {
                        response(res).unAuthorized(
                            `The user is not assigned to role${role.length > 1 ? "s" : ""}: ${roles.join(", ")}`
                        );
                    }
                } else {
                    response(res).serverError("Invalid roles object!");
                }
            } else {
                response(res).unAuthorized("The user is not authorized!");
            }
        };
    };

    return builder(wrapInArray(role));
}
