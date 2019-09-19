import { loadConfiguration } from "@blendsdk/express";
import { fromRoot } from "./utils";

/**
 * Interface describing the project configuration
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {
    PORT: number;
    PG_HOST: string;
    PG_USER: string;
    PG_DATABASE: string;
    PG_PASSWORD: string;
    PG_PORT: number;
    STATIC_FILES_MAX_AGE: number;
    JWT_SECRET: string;
    JWT_MAX_AGE: number;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_SECURE: boolean;
}

let config: any = null;

/**
 * Gets the current system configuration
 *
 * @export
 * @template T
 * @returns {T}
 */
export function getConfig<T extends IConfig>(): T {
    if (!config) {
        config = loadConfiguration([
            fromRoot("config", "config.base.json"),
            fromRoot("config", "config.%NODE_ENV%.json"),
            fromRoot("config", ".config.local.json")
        ]);
    }
    return config as T;
}
