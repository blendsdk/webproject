import { ensureFilePath } from "@blendsdk/stdlib";
import * as path from "path";
import { Application } from "../../application/Application";
import { IRuntimeConfig } from "../../configuration/Types";
import { ILogger } from "../ILogger";
import { WinstonFileLogger } from "./WinstonFileLogger";

/**
 * Creates a default file logger
 *
 * @export
 * @param {Application} self
 * @returns {ILogger}
 */
export function createDefaultFileLogger(self: Application): ILogger {
    const logDir = path.resolve(
        self.getConfig<IRuntimeConfig>().LOG_DIR || ensureFilePath(path.join(process.cwd(), "logs"))
    );
    const logger = new WinstonFileLogger({
        console: process.env.NODE_ENV === "development",
        fileLogger: [
            {
                level: "error",
                filename: path.join(logDir, "error.log")
            },
            {
                level: "info",
                filename: path.join(logDir, "access.log")
            }
        ]
    });
    logger.info(`Application logs to ${logDir}`);
    return logger;
}
