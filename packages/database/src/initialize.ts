import { createConnection } from "@blendsdk/sqlkit";
import { IConfigurationService, ILoggerService } from "@blendsdk/webapi-service";
import { Pool } from "pg";

/**
 * Interface describing a database connection
 *
 * @interface IDatabaseConfig
 */
interface IDatabaseConfig {
    DEBUG: boolean;
    PG_HOST: string;
    PG_USER: string;
    PG_DATABASE: string;
    PG_PASSWORD: string;
    PG_PORT: number;
}

/**
 * Initialized the default database connection
 *
 * @export
 */
export function initializeDatabaseConnection(
    configService: IConfigurationService<IDatabaseConfig>,
    loggerService: ILoggerService
): Pool {
    const conf = configService.getConfig();
    loggerService.info(`Database initialized to: ${conf.PG_DATABASE} on ${conf.PG_HOST}`);
    const conn = createConnection({
        host: conf.PG_HOST,
        user: conf.PG_USER,
        password: conf.PG_PASSWORD,
        database: conf.PG_DATABASE,
        port: conf.PG_PORT || 5432
    });
    conn.query("SELECT version()").then(value => {
        loggerService.info(value.rows[0]);
    });
    return conn;
}
