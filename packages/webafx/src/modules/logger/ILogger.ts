export interface ILogger {
    /**
     * Writes an error log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILogger
     */
    error(message: string | any, ...args: any[]): Promise<any>;

    /**
     * Writes a warning log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILogger
     */
    warn(message: string, ...args: any[]): Promise<any>;

    /**
     * Writes a debug log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILogger
     */
    debug(message: string, ...args: any[]): Promise<any>;

    /**
     * Writes an informational log
     *
     * @param {string} message
     * @param {...any[]} args
     * @memberof ILogger
     */
    info(message: string, ...args: any[]): Promise<any>;
}
