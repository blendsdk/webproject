import { ISysUser } from "../dbtypes";
import { sql_query } from "@blendsdk/sqlkit";

/**
 * Interface describing a getSysUserByUserId record.
 *
 * @interface IGetSysUserByUserId
 * @export
 */
export interface IGetSysUserByUserId {
    user_id?: number;
}

/**
 * Gets a record from the sys_user relation
 */
export const getSysUserByUserId = sql_query<ISysUser, IGetSysUserByUserId>(
    "SELECT * FROM sys_user WHERE user_id = :user_id",
    {
        single: true,
        outConverter: record => {
            record.password = undefined;
            return record;
        }
    }
);
