export interface ILoggerService {
    /**
     * Writes an error log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILoggerService
     */
    error(message: string | any, ...args: any[]): Promise<any>;

    /**
     * Writes a warning log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILoggerService
     */
    warn(message: string, ...args: any[]): Promise<any>;

    /**
     * Writes a debug log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILoggerService
     */
    debug(message: string, ...args: any[]): Promise<any>;

    /**
     * Writes an informational log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILoggerService
     */
    info(message: string, ...args: any[]): Promise<any>;
}
