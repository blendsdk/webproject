/**
 * Interface describing the project configuration
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {
    DEBUG: boolean;
    PORT: number;
    STATIC_FILES_MAX_AGE: number;
    JWT_SECRET: string;
    JWT_MAX_AGE: number;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_SECURE: boolean;
    ACCESS_ORIGIN: any;
}
