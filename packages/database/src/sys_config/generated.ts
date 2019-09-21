/**
 * DO NOT CHANGE THIS FILE!
 * This file is automatically generated.
 */
import { sql_delete, sql_insert, sql_query, sql_update } from "@blendsdk/sqlkit";
import { ISysConfig } from "../dbtypes";

/**
 * Insert a record into the sys_config relation
 */
export const insertIntoSysConfig = sql_insert<ISysConfig, ISysConfig>("sys_config");

/**
 * The IGetSysConfigByConfigId interface.
 *
 * @interface IGetSysConfigByConfigId
 * @export
 */
export interface IGetSysConfigByConfigId {
	/**
	 * @type {number}
	 * @memberof IGetSysConfigByConfigId
	 */
	config_id?: number;
}

/**
 * Gets a record from the sys_config relation
 */
export const getSysConfigByConfigId = sql_query<ISysConfig, IGetSysConfigByConfigId>(
	"SELECT * FROM sys_config WHERE config_id = :config_id",
	{ single: true }
);

/**
 * The IUpdateSysConfigByConfigId interface.
 *
 * @interface IUpdateSysConfigByConfigId
 * @export
 */
export interface IUpdateSysConfigByConfigId {
	/**
	 * @type {number}
	 * @memberof IUpdateSysConfigByConfigId
	 */
	config_id?: number;
}

/**
 * Updates a record from the sys_config relation
 */
export const updateSysConfigByConfigId = sql_update<ISysConfig, ISysConfig, IUpdateSysConfigByConfigId>("sys_config", {
	single: true
});

/**
 * The IDeleteSysConfigByConfigId interface.
 *
 * @interface IDeleteSysConfigByConfigId
 * @export
 */
export interface IDeleteSysConfigByConfigId {
	/**
	 * @type {number}
	 * @memberof IDeleteSysConfigByConfigId
	 */
	config_id?: number;
}

/**
 * Deletes a record from the sys_config relation
 */
export const deleteSysConfigByConfigId = sql_delete<ISysConfig, IDeleteSysConfigByConfigId>("sys_config", {
	single: true
});
