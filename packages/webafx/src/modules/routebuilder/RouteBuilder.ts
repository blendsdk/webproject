import { response, TRequestHandler } from "@blendsdk/express";
import { isNullOrUndefDefault, isObject, TClass, TFunction, wrapInArray } from "@blendsdk/stdlib";
import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { check, ValidationChain, validationResult } from "express-validator";
import { Application } from "../../application/Application";
import { MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE } from "../constants";
import { IRoute, IRouteParameter, TRequestHandlerFunction, TRouteController } from "./Types";

const INJ_APPLICATION = "INJ_APPLICATION";

/**
 * Higher order function for providing field validation check.
 *
 * @param {TRequestHandler} callback
 * @returns {Function}
 */
function withRequestValidation(callback: TRequestHandler): RequestHandler {
    return (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                callback(req, res);
            } else {
                response(res).validationError(errors);
            }
        } catch (err) {
            response(res).serverError(err);
        }
    };
}

/**
 * Middleware to remove any parameters that is not part of the route
 * definition.
 *
 * @param {IRoute} route
 * @returns {RequestHandler}
 */
function routeParameter(route: IRoute): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        const parts = ["body", "query", "params"];
        parts.forEach(partName => {
            if (isObject(req[partName])) {
                const newPart = {};
                Object.keys(route.parameters || {}).forEach(paramName => {
                    if (req[partName][paramName] !== undefined) {
                        newPart[paramName] = req[partName][paramName];
                    }
                });
                req[partName] = newPart;
            }
        });
        next();
    };
}

/**
 * Middleware to inject an object into the Request
 *
 * @exports
 * @param {string} name
 * @param {*} obj
 * @returns
 */
export function objectInjector(name: string, obj: any) {
    return (req: Request, _res: Response, next: NextFunction) => {
        req[name] = obj;
        next();
    };
}

export function getApplication(req: Request): Application {
    return req[INJ_APPLICATION] as Application;
}

/**
 * Module to building routes based on one or more
 * IRoute definition.
 *
 * @export
 * @class RouteBuilder
 */
export class RouteBuilder {
    protected routes: IRoute[];
    protected app: Application;

    public constructor(app: Application) {
        this.routes = [];
        this.app = app;
    }

    /**
     * Gets the authentication middleware if it is registered.
     *
     * @protected
     * @param {IRoute} route
     * @returns {TFunction}
     * @memberof RouteBuilder
     */
    protected getAuthenticationMiddleware(route: IRoute): TFunction {
        const noHandler = () => {
            throw new Error(`No authentication handler module was found for endpoint: ${route.endpoint}`);
        };
        return this.app.getModule<TFunction>(MODULE_ROUTE_AUTHENTICATION_MIDDLEWARE) || noHandler;
    }

    /**
     * Builds a route handler for a given route
     *
     * @protected
     * @param {IRoute} route
     * @returns {RequestHandler[]}
     * @memberof RouteBuilder
     */
    protected buildRouteHandlers(route: IRoute): RequestHandler[] {
        const me = this,
            result: RequestHandler[] = [objectInjector(INJ_APPLICATION, this.app), routeParameter(route)];
        route.authenticated = isNullOrUndefDefault(route.authenticated, false);
        route.parameters = route.parameters || {};
        // check if secure is needed
        if (route.authenticated) {
            result.push(me.getAuthenticationMiddleware(route));
        }
        // set parameter validation
        Object.keys(route.parameters).forEach((paramName: string) => {
            const param: IRouteParameter = route.parameters[paramName];
            const checker = check(paramName, param.message);
            me.checkSetParameterType(checker, param);
            me.checkSetOptionalParameter(checker, param);
            result.push(checker);
        });
        // set the user defined middlewares
        wrapInArray<RequestHandler>(route.middlewares || []).forEach(m => {
            result.push(m);
        });
        // adds the validation middle ware
        const requestHandler = me.getRequestHandler(route.controller);
        result.push(
            Object.keys(route.parameters).length === 0 ? requestHandler : withRequestValidation(requestHandler)
        );
        return result;
    }

    /**
     * Creates a request handler function if needed.
     *
     * @param {TRouteController} controller
     * @param {IDictionary} services
     * @returns {TFunction}
     */
    protected getRequestHandler(controller: TRouteController): TFunction {
        const me = this;
        if (controller && controller.prototype && controller.prototype.handleRequest) {
            const classInstance = new ((controller as any) as TClass)(me.app);
            return (...args: any): Promise<any> => {
                return classInstance.handleRequest(...args);
            };
        } else {
            return controller as TRequestHandlerFunction;
        }
    }

    /**
     * Checks and sets the validation "optional" flag
     *
     * @param {ValidationChain} checker
     * @param {IRouteParameter} param
     */
    protected checkSetOptionalParameter(checker: ValidationChain, param: IRouteParameter) {
        if (param.optional) {
            checker = checker.optional();
        }
    }

    /**
     * Check and set the route parameter validation type
     *
     * @param {ValidationChain} checker
     * @param {IRouteParameter} param
     */
    protected checkSetParameterType(checker: ValidationChain, param: IRouteParameter) {
        param.type = param.array ? "array" : param.type;
        switch (param.type) {
            case "array":
                checker = checker.isArray().toArray();
                break;
            case "number":
                checker = checker.isNumeric().toFloat();
                break;
            case "boolean":
                checker = checker.isBoolean().toBoolean();
                break;
            default:
                checker = checker.isString();
        }
    }

    /**
     * Initializes the routes in this application
     *
     * @memberof RouteBuilder
     */
    public initializeRoutes() {
        const me = this,
            expressApp = me.app.getExpressApp();
        me.routes.forEach(route => {
            expressApp[route.method](route.endpoint, ...me.buildRouteHandlers(route));
        });
    }

    /**
     * Adds one or more routes to the to route builder
     * collection.
     *
     * @param {(IRoute |  IRoute[])} route
     * @memberof RouteBuilder
     */
    public addRoute(route: IRoute | IRoute[]) {
        const me = this;
        wrapInArray<IRoute>(route).forEach(item => {
            me.routes.push(item);
        });
    }
}
