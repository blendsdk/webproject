/**
 * Interface describing a sys_config record.
 *
 * @interface ISysConfig
 * @export
 */
export interface ISysConfig {
	/**
	 * @type {number}
	 * @memberof ISysConfig
	 */
	config_id?: number;
	/**
	 * @type {string}
	 * @memberof ISysConfig
	 */
	config?: string;
	/**
	 * @type {string}
	 * @memberof ISysConfig
	 */
	value?: string;
}

/**
 * Interface describing a sys_i18n record.
 *
 * @interface ISysI18n
 * @export
 */
export interface ISysI18n {
	/**
	 * @type {number}
	 * @memberof ISysI18n
	 */
	id?: number;
	/**
	 * @type {string}
	 * @memberof ISysI18n
	 */
	locale?: string;
	/**
	 * @type {string}
	 * @memberof ISysI18n
	 */
	key?: string;
	/**
	 * @type {string}
	 * @memberof ISysI18n
	 */
	value?: string;
}

/**
 * Interface describing a sys_user record.
 *
 * @interface ISysUser
 * @export
 */
export interface ISysUser {
	/**
	 * @type {number}
	 * @memberof ISysUser
	 */
	user_id?: number;
	/**
	 * @type {string}
	 * @memberof ISysUser
	 */
	username?: string;
	/**
	 * @type {string}
	 * @memberof ISysUser
	 */
	password?: string;
	/**
	 * @type {string}
	 * @memberof ISysUser
	 */
	email?: string;
	/**
	 * @type {boolean}
	 * @memberof ISysUser
	 */
	is_active?: boolean;
}

/**
 * Interface describing a sys_role record.
 *
 * @interface ISysRole
 * @export
 */
export interface ISysRole {
	/**
	 * @type {number}
	 * @memberof ISysRole
	 */
	role_id?: number;
	/**
	 * @type {string}
	 * @memberof ISysRole
	 */
	role_name?: string;
}

/**
 * Interface describing a sys_user_role record.
 *
 * @interface ISysUserRole
 * @export
 */
export interface ISysUserRole {
	/**
	 * @type {number}
	 * @memberof ISysUserRole
	 */
	user_role_id?: number;
	/**
	 * @type {number}
	 * @memberof ISysUserRole
	 */
	user_id?: number;
	/**
	 * @type {number}
	 * @memberof ISysUserRole
	 */
	role_id?: number;
}

/**
 * Interface describing a sys_user_profile record.
 *
 * @interface ISysUserProfile
 * @export
 */
export interface ISysUserProfile {
	/**
	 * @type {number}
	 * @memberof ISysUserProfile
	 */
	user_profile_id?: number;
	/**
	 * @type {string}
	 * @memberof ISysUserProfile
	 */
	gender?: string;
	/**
	 * @type {string}
	 * @memberof ISysUserProfile
	 */
	title?: string;
	/**
	 * @type {string}
	 * @memberof ISysUserProfile
	 */
	first_name?: string;
	/**
	 * @type {string}
	 * @memberof ISysUserProfile
	 */
	last_name?: string;
	/**
	 * @type {number}
	 * @memberof ISysUserProfile
	 */
	user_id?: number;
}