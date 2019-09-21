/**
 * DO NOT CHANGE THIS FILE!
 * This file is automatically generated.
 */
import { sql_delete, sql_update } from "@blendsdk/sqlkit";
import { ISysUser } from "../dbtypes";
/**
 * The IUpdateSysUserByUserId interface.
 *
 * @interface IUpdateSysUserByUserId
 * @export
 */
export interface IUpdateSysUserByUserId {
	/**
	 * @type {number}
	 * @memberof IUpdateSysUserByUserId
	 */
	user_id?: number;
}

/**
 * Updates a record from the sys_user relation
 */
export const updateSysUserByUserId = sql_update<ISysUser, ISysUser, IUpdateSysUserByUserId>("sys_user", {
	single: true
});

/**
 * The IDeleteSysUserByUserId interface.
 *
 * @interface IDeleteSysUserByUserId
 * @export
 */
export interface IDeleteSysUserByUserId {
	/**
	 * @type {number}
	 * @memberof IDeleteSysUserByUserId
	 */
	user_id?: number;
}

/**
 * Deletes a record from the sys_user relation
 */
export const deleteSysUserByUserId = sql_delete<ISysUser, IDeleteSysUserByUserId>("sys_user", { single: true });