import { NextFunction, Request, Response } from "express";

/**
 * Abstract class used for creating a class based request handler
 *
 * @export
 * @abstract
 * @class RequestController
 */
export abstract class RouteController {
    /**
     * Request handler
     *
     * @abstract
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof RequestController
     */
    public abstract async handleRequest(req: Request, res: Response, next?: NextFunction): Promise<any>;
}
