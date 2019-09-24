import { forEach, isArray, wrapInArray } from "@blendsdk/stdlib";
import errorHandler from "errorhandler";
import express from "express";
import { Application as Express } from "express-serve-static-core";
import { Server } from "http";
import Mail from "nodemailer/lib/mailer";
import { ApplicationConfiguration } from "../configuration/Configuration";
import { IRuntimeConfig } from "../configuration/Types";
import { ILogger } from "../logger/ILogger";
import { createDefaultFileLogger } from "../logger/winston/DefaultLogger";

export type TModule = (app: Application) => { id: string; module: any } | void;

export const MODULE_LOGGER = "MODULE_LOGGER";
export const MODULE_MAILER = "MODULE_MAILER";
export const MODULE_CONFIGURATION = "MODULE_CONFIGURATION";

/**
 * Interface for configuring the Application
 *
 * @export
 * @interface IApplicationConfig
 */
export interface IApplicationConfig {
    /**
     * An array of configuration files to load
     * into the application.
     *
     * @type {(string | string[])}
     * @memberof IApplicationConfig
     */
    configFiles?: string | string[];
    /**
     * A function that can create and return
     * an ILogger instance.
     *
     * @memberof IApplicationConfig
     */
    logger?: (app: Application) => ILogger;
    /**
     * A function that can create and return an nodemailer
     * instance.
     *
     * @memberof IApplicationConfig
     */
    mailer?: (app: Application) => Mail;
    /**
     *
     *
     * @type {TModule[]}
     * @memberof IApplicationConfig
     */
    modules?: TModule[];
}

/**
 * Set the app in development mode by default.
 */
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export class Application {
    /**
     * Reference to the application configuration.
     *
     * @protected
     * @type {IApplicationConfig}
     * @memberof Application
     */
    protected config: IApplicationConfig;
    /**
     * Reference to the express application instance
     *
     * @protected
     * @type {Express}
     * @memberof Application
     */
    protected expressApp: Express;
    /**
     * Reference to the HTTP listener instance.
     *
     * @protected
     * @type {Server}
     * @memberof Application
     */
    protected server: Server;
    /**
     * A collection of loaded modules in this application.
     *
     * @protected
     * @type {{ [id: string]: any }}
     * @memberof Application
     */
    protected modules: { [id: string]: any };

    /**
     * Creates an instance of Application.
     * @param {IApplicationConfig} config
     * @memberof Application
     */
    public constructor(config: IApplicationConfig) {
        this.config = config;
        this.modules = {};
        this.server = null;
        this.expressApp = express();
        this.loadModules();
    }

    /**
     * Loads the default modules of this application
     *
     * @protected
     * @memberof Application
     */
    protected loadDefaultModules() {
        this.modules[MODULE_CONFIGURATION] = new ApplicationConfiguration(this.config.configFiles || []);
        this.modules[MODULE_LOGGER] = (this.config.logger || createDefaultFileLogger)(this);

        if (this.config.mailer) {
            this.modules[MODULE_MAILER] = this.config.mailer(this);
        }
    }

    protected loadModules() {
        const me = this;
        me.loadDefaultModules();
        /**
         * Load the modules into the application
         */
        wrapInArray<TModule>(this.config.modules || []).forEach(builder => {
            const result = builder(this);
            if (result) {
                const { id, module } = result;
                if (!this.modules[id]) {
                    this.modules[id] = module;
                } else {
                    throw new Error(`A module with id ${id} already exists!`);
                }
            }
        });
        forEach(this.modules, (_module, id) => {
            me.getLogger().info(`Module ${id} is loaded.`);
        });
    }

    /**
     * Runs the application
     *
     * @returns
     * @memberof Application
     */
    public run() {
        const config = this.getConfig<IRuntimeConfig>();
        config.PORT = config.PORT || 3000;
        if (process.env.SHOW_CONFIG) {
            console.log(JSON.stringify(config, null, 4));
        }
        if (process.env.NODE_ENV === "development") {
            this.expressApp.use(errorHandler());
        }
        if (process.env.DEBUG) {
            this.getLogger().info(JSON.stringify(config, null, 4));
        }
        /**
         * Start Express server if we are not testing.
         */
        if (process.env.NODE_ENV !== "test") {
            this.server = this.expressApp.listen(config.PORT, async () => {
                try {
                    await this.getLogger().info(
                        `App is running at http://localhost:${config.PORT} in ${process.env.NODE_ENV} mode.`
                    );
                    await this.getLogger().info("Press CTRL-C to stop\n");
                } catch (err) {
                    console.log(err);
                    process.exit(-1);
                }
            });
        }
        return {
            server: this.server,
            app: this.expressApp
        };
    }

    /**
     * Gets a reference to a loaded module.
     *
     * @template T
     * @param {string} id
     * @returns {T}
     * @memberof Application
     */
    public getModule<T>(id: string): T {
        return this.modules[id] || undefined;
    }

    /**
     * Returns the current application configuration parameters.
     *
     * @template T
     * @returns {T}
     * @memberof Application
     */
    public getConfig<T>(): T {
        return this.getModule<ApplicationConfiguration>(MODULE_CONFIGURATION).getConfig<T>();
    }

    /**
     * Gets the configured logger
     *
     * @returns {ILogger}
     * @memberof Application
     */
    public getLogger(): ILogger {
        return this.getModule<ILogger>(MODULE_LOGGER);
    }

    /**
     * Get the configured mailer
     *
     * @returns {Mail}
     * @memberof Application
     */
    public getMailer(): Mail {
        return this.getModule<Mail>(MODULE_MAILER);
    }

    /**
     * Gets the instance of the Express app
     *
     * @returns {Express}
     * @memberof Application
     */
    public getExpressApp(): Express {
        return this.expressApp;
    }
}
