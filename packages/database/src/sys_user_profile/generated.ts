/**
 * DO NOT CHANGE THIS FILE!
 * This file is automatically generated.
 */
import { sql_delete, sql_insert, sql_query, sql_update } from "@blendsdk/sqlkit";
import { ISysUserProfile } from "../dbtypes";

/**
 * Insert a record into the sys_user_profile relation
 */
export const insertIntoSysUserProfile = sql_insert<ISysUserProfile, ISysUserProfile>("sys_user_profile");

/**
 * The IGetSysUserProfileByUserProfileId interface.
 *
 * @interface IGetSysUserProfileByUserProfileId
 * @export
 */
export interface IGetSysUserProfileByUserProfileId {
	/**
	 * @type {number}
	 * @memberof IGetSysUserProfileByUserProfileId
	 */
	user_profile_id?: number;
}

/**
 * Gets a record from the sys_user_profile relation
 */
export const getSysUserProfileByUserProfileId = sql_query<ISysUserProfile, IGetSysUserProfileByUserProfileId>(
	"SELECT * FROM sys_user_profile WHERE user_profile_id = :user_profile_id",
	{ single: true }
);

/**
 * The IUpdateSysUserProfileByUserProfileId interface.
 *
 * @interface IUpdateSysUserProfileByUserProfileId
 * @export
 */
export interface IUpdateSysUserProfileByUserProfileId {
	/**
	 * @type {number}
	 * @memberof IUpdateSysUserProfileByUserProfileId
	 */
	user_profile_id?: number;
}

/**
 * Updates a record from the sys_user_profile relation
 */
export const updateSysUserProfileByUserProfileId = sql_update<
	ISysUserProfile,
	ISysUserProfile,
	IUpdateSysUserProfileByUserProfileId
>("sys_user_profile", { single: true });

/**
 * The IDeleteSysUserProfileByUserProfileId interface.
 *
 * @interface IDeleteSysUserProfileByUserProfileId
 * @export
 */
export interface IDeleteSysUserProfileByUserProfileId {
	/**
	 * @type {number}
	 * @memberof IDeleteSysUserProfileByUserProfileId
	 */
	user_profile_id?: number;
}

/**
 * Deletes a record from the sys_user_profile relation
 */
export const deleteSysUserProfileByUserProfileId = sql_delete<ISysUserProfile, IDeleteSysUserProfileByUserProfileId>(
	"sys_user_profile",
	{ single: true }
);
