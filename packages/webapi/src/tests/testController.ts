import { Request, Response } from "express";
import { response, getParameters } from "@blendsdk/express";
import { logger } from "../logger";

/**
 * Test controller returning the request back as a response.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export async function testController(req: Request, res: Response) {
    logger.debug(getParameters(req));
    return response(res).OK(getParameters<any>(req));
}
