import { wrapInArray } from "@blendsdk/stdlib";
import winston from "winston";
import { FileTransportOptions } from "winston/lib/winston/transports";
import { ILogger } from "../ILogger";

/**
 * Export the winston types
 */
export { FileTransportOptions } from "winston/lib/winston/transports";

/**
 * Interface for configuring the WinstonFileLogger
 *
 * @export
 * @interface IWinstonFileLogger
 */
export interface IWinstonFileLogger {
    console?: boolean;
    fileLogger?: FileTransportOptions | FileTransportOptions[];
}

export class WinstonFileLogger implements ILogger {
    /**
     * Reference to the registered winston logger
     *
     * @protected
     * @type {winston.Logger}
     * @memberof WinstonFileLogger
     */
    protected logger: winston.Logger;
    /**
     * Creates an instance of WinstonLoggerService.
     * @param {IWinstonFileLogger} config
     * @memberof WinstonFileLogger
     */
    public constructor(config: IWinstonFileLogger) {
        config = config || {};
        const transports = [];
        if (config.console) {
            transports.push(
                new winston.transports.Console({
                    level: "debug",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.printf(info => {
                            return `${info.timestamp} - ${info.level}: ${info.message}`;
                        })
                    )
                })
            );
        }

        wrapInArray<FileTransportOptions>(config.fileLogger || []).forEach(item => {
            transports.push(new winston.transports.File(item));
        });

        this.logger = winston.createLogger({
            transports
        });
    }

    /**
     * Registers a winston logger for this class
     *
     * @param {winston.Logger} loggerObject
     * @memberof WinstonFileLogger
     */
    public registerLogger(loggerObject: winston.Logger) {
        this.logger = loggerObject;
    }

    /**
     * Writes an error log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof WinstonFileLogger
     */
    public error(message: string | any, ...args: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.logger.error(message as any, ...args);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Writes a warning log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof WinstonFileLogger
     */
    public warn(message: string, ...args: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.logger.warn(message as any, ...args);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Writes a debug log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof WinstonFileLogger
     */
    public debug(message: string, ...args: any[]) {
        return new Promise((resolve, reject) => {
            try {
                this.logger.debug(message as any, ...args);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Writes an informational log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof WinstonFileLogger
     */
    public info(message: string, ...args: any[]) {
        return new Promise((resolve, reject) => {
            try {
                this.logger.info(message as any, ...args);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}
