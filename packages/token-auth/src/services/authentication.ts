import { ISysRole } from "@blendsdk/webapi-database";
import { getUserRolesByUserID } from "@blendsdk/webapi-database/dist/sys_role";
import { findUserByUsernameOrEmail } from "@blendsdk/webapi-database/dist/sys_user";
import bcrypt from "bcryptjs";
import { IAuthenticatedUser } from "../types";

/**
 * Interface describing a validates user
 *
 * @export
 * @interface IValidateUserResult
 */
export interface IValidateUserResult {
    error?: any;
    user?: IAuthenticatedUser;
}

/**
 * Given a username and a password this function validates the user
 * and returns the results.
 *
 * @export
 * @param {string} username
 * @param {string} password
 * @returns {Promise<IValidateUserResult>}
 */
export function validateUser(username: string, password: string): Promise<IValidateUserResult> {
    return new Promise(async (resolve, reject) => {
        try {
            const userRecord = await findUserByUsernameOrEmail({ username });
            if (userRecord && (await bcrypt.compare(password, userRecord.password))) {
                const rolesRecord = await getUserRolesByUserID({ user_id: userRecord.user_id });
                const user: IAuthenticatedUser = { ...userRecord };
                user.roles = rolesRecord.map((r: ISysRole) => {
                    return r.role_name;
                });
                user.password = undefined;
                user.is_active = undefined;
                resolve({
                    user,
                    error: null
                });
            } else {
                resolve({
                    user: null,
                    error: "Invalid username or password!"
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}
