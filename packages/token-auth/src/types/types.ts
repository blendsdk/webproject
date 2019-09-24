import { ISysUser } from "@blendsdk/webapi-database";

/**
 * Interface  for describing an authenticated user
 *
 * @export
 * @interface IAuthenticatedUser
 * @extends {ISysUser}
 */
export interface IAuthenticatedUser extends ISysUser {
    roles?: string[];
}
