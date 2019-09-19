import { sql_query } from "@blendsdk/sqlkit";
import { ISysUser } from "../dbtypes";

/**
 * Interface describing the input parameters of findUserByUsernameOrEmail
 *
 * @export
 * @interface IFindUserByUsernameOrEmail
 */
export interface IFindUserByUsernameOrEmail {
    username: string;
}

/**
 * Find s user by username or email
 */
export const findUserByUsernameOrEmail = sql_query<ISysUser, IFindUserByUsernameOrEmail>(
    `
        select
            *
        from
            sys_user
        where
            lower(username) = lower(:username) OR
            lower(email) = lower(:username)
    `,
    { single: true }
);
