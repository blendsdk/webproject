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

/**
 * The IApiGreetRequest interface.
 *
 * @interface IApiGreetRequest
 * @export
 */
export interface IApiGreetRequest {
	/**
	 * @type {string}
	 * @memberof IApiGreetRequest
	 */
	name?: string;
}

/**
 * The IApiGreetResponse interface.
 *
 * @interface IApiGreetResponse
 * @export
 */
export interface IApiGreetResponse {
	/**
	 * @type {string}
	 * @memberof IApiGreetResponse
	 */
	hello: string;
}
