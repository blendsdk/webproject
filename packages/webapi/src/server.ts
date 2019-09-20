import errorHandler from "errorhandler";
import { logger } from "./services";
import { Server } from "http";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

let server: Server = null;

if (process.env.NODE_ENV !== "test") {
    server = app.listen(app.get("port"), () => {
        logger.info("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        logger.info("Press CTRL-C to stop\n");
    });
}

/**
 * Start Express server.
 */

export { server, app };
