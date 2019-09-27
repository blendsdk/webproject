/**
 * Interface describing the JWT
 * configuration parameters
 *
 * @interface IJWTConfig
 */
export interface IJWTConfig {
    JWT_EXPIRES_IN_SECONDS?: number;
    JWT_SECRET?: string;
}
