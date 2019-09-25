import { apply, applyVariables, IDictionary, wrapInArray } from "@blendsdk/stdlib";
import * as fs from "fs";

/**
 * Loads application configuration files
 *
 * @export
 * @class ApplicationConfiguration
 * @implements {IApplicationConfiguration}
 */
export class ApplicationConfiguration {
    /**
     * reference to the loaded configuration object
     *
     * @protected
     * @type {*}
     * @memberof ApplicationConfiguration
     */
    protected config: IDictionary;

    /**
     * Creates an instance of ApplicationConfiguration.
     * @param {(string | string[])} files
     * @memberof ApplicationConfiguration
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
    protected loadConfiguration(files: string | string[]): IDictionary {
        let result = {};
        wrapInArray<string>(files || []).forEach(file => {
            file = applyVariables(file, process.env);
            if (fs.existsSync(file)) {
                // tslint:disable-next-line: no-eval
                const contents = eval(applyVariables(fs.readFileSync(file, "utf8").toString(), process.env || {}));
                result = apply(result, contents, { overwrite: true, mergeArrays: true });
            } else {
                console.log(`Skipping ${file}! Not found.`);
            }
        });
        return result as IDictionary;
    }

    /**
     * Get the current configuration parameters
     *
     * @template returnType
     * @returns {returnType}
     * @memberof ApplicationConfiguration
     */
    public getConfig<returnType>(): returnType {
        return (this.config || {}) as returnType;
    }
}
