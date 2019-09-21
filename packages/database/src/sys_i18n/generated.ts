/**
 * DO NOT CHANGE THIS FILE!
 * This file is automatically generated.
 */
import { sql_delete, sql_insert, sql_query, sql_update } from "@blendsdk/sqlkit";
import { ISysI18n } from "../dbtypes";

/**
 * Insert a record into the sys_i18n relation
 */
export const insertIntoSysI18n = sql_insert<ISysI18n, ISysI18n>("sys_i18n");

/**
 * The IGetSysI18nById interface.
 *
 * @interface IGetSysI18nById
 * @export
 */
export interface IGetSysI18nById {
	/**
	 * @type {number}
	 * @memberof IGetSysI18nById
	 */
	id?: number;
}

/**
 * Gets a record from the sys_i18n relation
 */
export const getSysI18nById = sql_query<ISysI18n, IGetSysI18nById>("SELECT * FROM sys_i18n WHERE id = :id", {
	single: true
});

/**
 * The IUpdateSysI18nById interface.
 *
 * @interface IUpdateSysI18nById
 * @export
 */
export interface IUpdateSysI18nById {
	/**
	 * @type {number}
	 * @memberof IUpdateSysI18nById
	 */
	id?: number;
}

/**
 * Updates a record from the sys_i18n relation
 */
export const updateSysI18nById = sql_update<ISysI18n, ISysI18n, IUpdateSysI18nById>("sys_i18n", { single: true });

/**
 * The IDeleteSysI18nById interface.
 *
 * @interface IDeleteSysI18nById
 * @export
 */
export interface IDeleteSysI18nById {
	/**
	 * @type {number}
	 * @memberof IDeleteSysI18nById
	 */
	id?: number;
}

/**
 * Deletes a record from the sys_i18n relation
 */
export const deleteSysI18nById = sql_delete<ISysI18n, IDeleteSysI18nById>("sys_i18n", { single: true });
