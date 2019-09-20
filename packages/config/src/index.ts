import { apply, applyVariables, wrapInArray } from "@blendsdk/stdlib";
import { IConfigurationService } from "@blendsdk/webapi-service";
import * as fs from "fs";

/**
 * This services loads configuration files
 *
 * @export
 * @class ConfigurationService
 * @implements {IConfigurationService}
 */
export class ConfigurationService<T> implements IConfigurationService<T> {
    /**
     * reference to the loaded configuration object
     *
     * @protected
     * @type {*}
     * @memberof ConfigurationService
     */
    protected config: T;

    /**
     * Creates an instance of ConfigurationService.
     * @param {(string | string[])} files
     * @memberof ConfigurationService
     */
    public constructor(files: string | string[]) {
        this.config = this.loadConfiguration(files);
    }

    /**
     * Loads one or more json configuration into the
     * process environment.
     *
     * If the provided filename contains a %node_env%, it will
     * be substituted with the process.env.NODE_ENV variable
     * if it exists.
     *
     * @export
     * @param {string[]} files
     */
    protected loadConfiguration(files: string | string[]): T {
        let result = {};
        wrapInArray<string>(files || []).forEach(file => {
            file = applyVariables(file, process.env);
            if (fs.existsSync(file)) {
                const contents = JSON.parse(
                    applyVariables(fs.readFileSync(file, "utf8").toString(), process.env || {})
                );
                result = apply(result, contents, { overwrite: true, mergeArrays: true });
            } else {
                console.log(`Skipping ${file}! Not found.`);
            }
        });
        return result as T;
    }

    public getConfig<returnType extends T>(): returnType {
        return (this.config || {}) as returnType;
    }
}
