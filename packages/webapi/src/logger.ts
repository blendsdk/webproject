import winston from "winston";
import * as path from "path";

let logger: winston.Logger;

if (!logger) {
    const transports = [];
    if (process.env.NODE_ENV === "development") {
        transports.push(new winston.transports.Console({ level: "debug" }));
    } else {
        transports.push(
            new winston.transports.File({
                filename: path.join("log", "app.log"),
                level: "error"
            })
        );
    }
    logger = winston.createLogger({
        transports
    });
}

export { logger };
