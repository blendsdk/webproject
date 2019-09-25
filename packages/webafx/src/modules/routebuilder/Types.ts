import { TClass } from "@blendsdk/stdlib";
import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";

/**
 * Type describing REST methods
 */
export type TRouteMethod = "get" | "post" | "patch" | "delete";

/**
 * Type describing the REST parameter types
 */
export type TRouteParameter = "string" | "number" | "boolean" | "array";

/**
 * Type describing a controller method
 */
export type TRequestHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Type of both RequestController and TRequestHandlerFunction
 */
export type TRouteController = TRequestHandlerFunction | TClass;

/**
 * Interface describing a route parameter
 *
 * @export
 * @interface IRouteParameter
 */
export interface IRouteParameter {
    /**
     * Type of the route parameter
     *
     * @type {TRouteParameter}
     * @memberof IRouteParameter
     */
    type: TRouteParameter;
    /**
     * Validation or an error message
     *
     * @type {string}
     * @memberof IRouteParameter
     */
    message?: string;
    /**
     * Is this parameter optional?
     *
     * @type {boolean}
     * @memberof IRouteParameter
     */
    optional?: boolean;
    /**
     * Is this paameter an array?
     *
     * @type {boolean}
     * @memberof IRouteParameter
     */
    array?: boolean;
}

/**
 * Interface for describing a route response
 *
 * @export
 * @interface IRouteResponse
 */
export interface IRouteResponse {}

/**
 * Interface describing a route
 *
 * @export
 * @interface IRoute
 */
export interface IRoute {
    /**
     * The request method
     *
     * @type {TRouteMethod}
     * @memberof IRoute
     */
    method: TRouteMethod;
    /**
     * The endpoint URI
     *
     * @type {string}
     * @memberof IRoute
     */
    endpoint: string;
    /**
     * Should this endpoint be authenticated?
     *
     * @type {boolean}
     * @memberof IRoute
     */
    authenticated?: boolean;
    /**
     * The controller handling the request and response
     *
     * @type {TRouteController}
     * @memberof IRoute
     */
    controller: TRouteController;
    /**
     * Array of Express middlewares
     *
     * @type {RequestHandler[]}
     * @memberof IRoute
     */
    middlewares?: RequestHandler[];
    /**
     * A dictionary of parameters required with this Route
     *
     * @type {{
     *         [name: string]: IRouteParameter;
     *     }}
     * @memberof IRoute
     */
    parameters?: {
        [name: string]: IRouteParameter;
    };
}
