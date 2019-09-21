import { sql_insert } from "@blendsdk/sqlkit";
import bcrypt from "bcryptjs";
import { ISysUser } from "../dbtypes";

/**
 * Insert a record into the sys_user relation
 */
export const insertIntoSysUser = sql_insert<ISysUser, ISysUser>("sys_user", {
    inConverter: (record: ISysUser) => {
        const salt = bcrypt.genSaltSync(12);
        record.password = bcrypt.hashSync(record.password, salt);
        return record;
    },
    outConverter: record => {
        record.password = undefined;
        return record;
    }
});
