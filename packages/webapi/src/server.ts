import errorHandler from "errorhandler";
import { logger } from "./logger";
import { logger as globalLogger } from "@blendsdk/express";

/**
 * Make sure the HTTP response stack has a logger
 */
globalLogger.registerLogger(logger);

import app from "./app";
import { Server } from "http";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

let server: Server = null;

if (!process.env.NODE_JEST) {
    server = app.listen(app.get("port"), () => {
        logger.info("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        logger.info("Press CTRL-C to stop\n");
    });
}

/**
 * Start Express server.
 */

export { server, app };
