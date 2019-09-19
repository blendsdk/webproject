import { sql_query, IDynamicQuery } from "@blendsdk/sqlkit";
import { ISysRole } from "../dbtypes";
import { wrapInArray } from "@blendsdk/stdlib";

/**
 * Interface describing the input parameters of getUserRolesByUserID
 *
 * @export
 * @interface IGetUserRolesByUserID
 */
export interface IGetUserRolesByUserID {
    user_id: number;
}

/**
 * Gets user roles by user ID
 */
export const getUserRolesByUserID = sql_query<ISysRole[], IGetUserRolesByUserID>(
    `
        select
            r.*
        from
            sys_role r
            inner join sys_user_role ur on r.role_id = ur.role_id
        where
            ur.user_id = :user_id
    `
);

/**
 * Interface describing input parameters of findRolesByRoleName
 *
 * @export
 * @interface IFindRolesByRoleName
 */
export interface IFindRolesByRoleName {
    roles: string | string[];
}

/**
 * Finds role records by role names
 */
export const findRolesByRoleName = sql_query<ISysRole[], IFindRolesByRoleName>(
    (params: IFindRolesByRoleName): IDynamicQuery => {
        const role = wrapInArray(params.roles);
        return {
            named: false,
            sql: `select * from sys_role where role_name in (${role
                .map((_a, i) => {
                    return "$" + (i + 1);
                })
                .join(",")})`,
            parameters: role
        };
    }
);
