import { RouteController as RouteControllerBase } from "@blendsdk/express";
import Mail from "nodemailer/lib/mailer";
import { Pool } from "pg";
import { ServiceLocator } from "../locator";
import { IConfigurationService } from "./config";
import { ILoggerService } from "./logger";

/**
 * Interface describing common service
 *
 * @export
 * @interface IDefaultServices
 */
export interface ICommonServices {
    configService: IConfigurationService<any>;
    loggerService: ILoggerService;
    serviceLocator: ServiceLocator;
    mailerService: Mail;
    databaseService: Pool;
}

/**
 * Abstract Router to be used as a basis for implementing a module.
 *
 * @export
 * @abstract
 * @class RouterController
 * @extends {RouteControllerBase}
 */
export abstract class RouteController extends RouteControllerBase {
    /**
     * Reference to the common services instance
     *
     * @protected
     * @type {ICommonServices}
     * @memberof RouterController
     */
    protected services: ICommonServices;

    /**
     * Creates an instance of RouterController.
     * @param {ICommonServices} services
     * @memberof RouterController
     */
    public constructor(services: ICommonServices) {
        super();
        this.services = services;
    }
}
