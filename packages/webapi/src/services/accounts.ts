import { ISysRole } from "../database/dbtypes";
import { asyncForEach } from "@blendsdk/stdlib";
import { findRolesByRoleName } from "../database/sys_role";
import { insertIntoSysUserRole } from "../database/sys_user_role";

/**
 * Assigns one or more roles to a user
 *
 * @export
 * @param {number} user_id
 * @param {(string | string[])} roles
 * @returns {Promise<boolean>}
 */
export function assignRolesToUser(user_id: number, roles: string | string[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const rls = await findRolesByRoleName({ roles });
            if (rls.length !== 0) {
                asyncForEach<ISysRole>(rls, async (item: ISysRole) => {
                    await insertIntoSysUserRole({
                        user_id,
                        role_id: item.role_id
                    });
                });
                resolve(true);
            } else {
                reject(`None of the provided roles could be assigned to this user!`);
            }
        } catch (err) {
            reject(err);
        }
    });
}
