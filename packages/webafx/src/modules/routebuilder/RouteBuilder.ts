import { response, TRequestHandler } from "@blendsdk/express";
import { IDictionary, isClass, isNullOrUndefDefault, isObject, TClass, TFunction, wrapInArray } from "@blendsdk/stdlib";
import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { check, ValidationChain, validationResult } from "express-validator";
import { Application } from "../../application/Application";
import { ILogger } from "../logger/ILogger";
import { IRoute, IRouteParameter, TRequestHandlerFunction, TRouteController } from "./Types";

/**
 * Higher order function for providing field validation check.
 *
 * @export
 * @param {TRequestHandler} callback
 * @returns {Function}
 */
export function withRequestValidation(callback: TRequestHandler): RequestHandler {
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
 * Checks and sets the validation "optional" flag
 *
 * @param {ValidationChain} checker
 * @param {IRouteParameter} param
 */
function checkSetOptionalParameter(checker: ValidationChain, param: IRouteParameter) {
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
function checkSetParameterType(checker: ValidationChain, param: IRouteParameter) {
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
 * Creates a request handler function if needed.
 *
 * @param {TRouteController} controller
 * @param {IDictionary} services
 * @returns {TFunction}
 */
function getRequestHandler(controller: TRouteController, services: IDictionary): TFunction {
    if (isClass(controller)) {
        const classInstance = new ((controller as any) as TClass)(services || {});
        return (...args: any): Promise<any> => {
            return classInstance.handleRequest(...args);
        };
    } else {
        return controller as TRequestHandlerFunction;
    }
}

/**
 * Build route handler based on an IRoute configuration
 *
 * @param {IRoute} route
 * @param {TAuthenticationMiddleware} is_authenticated
 * @param {IDictionary} services
 * @returns {RequestHandler[]}
 */
function buildHandlers(
    route: IRoute,
    authenticationMiddleware: TRequestHandler,
    services: IDictionary
): RequestHandler[] {
    const result: RequestHandler[] = [routeParameter(route)];
    route.authenticated = isNullOrUndefDefault(route.authenticated, true);
    route.parameters = route.parameters || {};
    // check if secure is needed
    if (route.authenticated && authenticationMiddleware) {
        result.push(authenticationMiddleware);
    }
    // set parameter validation
    Object.keys(route.parameters).forEach((paramName: string) => {
        const param: IRouteParameter = route.parameters[paramName];
        const checker = check(paramName, param.message);
        checkSetParameterType(checker, param);
        checkSetOptionalParameter(checker, param);
        result.push(checker);
    });
    // set the user defined middlewares
    wrapInArray<RequestHandler>(route.middlewares || []).forEach(m => {
        result.push(m);
    });
    // adds the validation middle ware
    const requestHandler = getRequestHandler(route.controller, services);
    result.push(Object.keys(route.parameters).length === 0 ? requestHandler : withRequestValidation(requestHandler));
    return result;
}

export class RouteBuilder {}
