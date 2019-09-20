import express from "express";
import errorHandler from "errorhandler";

// Create Express server
const app = express();

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

export default app;
