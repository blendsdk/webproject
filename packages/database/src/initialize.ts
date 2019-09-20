import { logger } from "@blendsdk/express";
import { createConnection } from "@blendsdk/sqlkit";
import { Logger } from "winston";

/**
 * Initialized the default database connection
 *
 * @export
 */
export function initializeDatabase(logger: Logger) {
    const conf = getConfig();
    createConnection({
        host: conf.PG_HOST,
        user: conf.PG_USER,
        password: conf.PG_PASSWORD,
        database: conf.PG_DATABASE,
        port: conf.PG_PORT || 5432
    });
    logger.info(`Database initialized to: ${conf.PG_DATABASE} on ${conf.PG_HOST}`);
}
