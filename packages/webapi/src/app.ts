import express from "express";
import errorHandler from "errorhandler";
import { initWebApplication, initWebModules } from "./utils";

// Create Express server
const app = express();

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

/**
 * Initializing the webserver
 */
initWebApplication(app);
/**
 * Initializing the app modules
 */
initWebModules(app);

export default app;
