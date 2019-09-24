/**
 * The IApiAuthenticationRequest interface.
 *
 * @interface IApiAuthenticationRequest
 * @export
 */
export interface IApiAuthenticationRequest {
	/**
	 * @type {string}
	 * @memberof IApiAuthenticationRequest
	 */
	username: string;
	/**
	 * @type {string}
	 * @memberof IApiAuthenticationRequest
	 */
	password: string;
	/**
	 * @type {string}
	 * @memberof IApiAuthenticationRequest
	 */
	language?: string;
}

/**
 * The IApiAuthenticationResponse interface.
 *
 * @interface IApiAuthenticationResponse
 * @export
 */
export interface IApiAuthenticationResponse {
	/**
	 * @type {boolean}
	 * @memberof IApiAuthenticationResponse
	 */
	success: boolean;
	/**
	 * @type {string}
	 * @memberof IApiAuthenticationResponse
	 */
	token: string;
}
