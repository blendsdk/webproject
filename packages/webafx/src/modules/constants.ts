import { Application } from "../application/Application";

/**
 * Type describing a module configuration
 */
export type TModule = (app: Application) => { id: string; module: any } | void;

export const MODULE_LOGGER = "MODULE_LOGGER";
export const MODULE_MAILER = "MODULE_MAILER";
export const MODULE_CONFIGURATION = "MODULE_CONFIGURATION";
export const MODULE_ROUTE_BUILDER = "MODULE_ROUTE_BUILDER";
export const MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE = "MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE";
