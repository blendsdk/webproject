/**
 * The IApiParamsRequest interface.
 *
 * @interface IApiParamsRequest
 * @export
 */
export interface IApiParamsRequest {
	/**
	 * @type {number}
	 * @memberof IApiParamsRequest
	 */
	q?: number;
	/**
	 * @type {number[]}
	 * @memberof IApiParamsRequest
	 */
	list?: number[];
	/**
	 * @type {boolean}
	 * @memberof IApiParamsRequest
	 */
	flag?: boolean;
	/**
	 * @type {number}
	 * @memberof IApiParamsRequest
	 */
	amount?: number;
}
