import { wrapInArray } from "@blendsdk/stdlib";
import { ILoggerService } from "@blendsdk/webapi-service";
import winston from "winston";

export interface IWinstonFileLogger {
    filename: string;
    level: string;
}

export interface IWinstonLoggerService {
    console?: boolean;
    fileLogger?: IWinstonFileLogger | IWinstonFileLogger[];
}

export class WinstonLoggerService implements ILoggerService {
    /**
     * Reference to the registered winston logger
     *
     * @protected
     * @type {winston.Logger}
     * @memberof WinstonLoggerService
     */
    protected logger: winston.Logger;

    public constructor(config: IWinstonLoggerService) {
        config = config || {};
        const transports = [];
        if (config.console) {
            transports.push(new winston.transports.Console({ level: "debug" }));
        }

        wrapInArray<IWinstonFileLogger>(config.fileLogger || []).forEach(logger => {
            transports.push(new winston.transports.File(logger));
        });

        this.logger = winston.createLogger({
            transports
        });
    }

    /**
     * Registers a winston logger for this class
     *
     * @param {winston.Logger} loggerObject
     * @memberof WinstonLoggerService
     */
    public registerLogger(loggerObject: winston.Logger) {
        this.logger = loggerObject;
    }

    /**
     * Writes an error log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof WinstonLoggerService
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
     * @memberof WinstonLoggerService
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
     * @memberof WinstonLoggerService
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
     * @memberof WinstonLoggerService
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
