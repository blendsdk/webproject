import { Request, Response } from "express";
import { response, getParameters } from "@blendsdk/express";
import { IApiGreetRequest, IApiGreetResponse } from "../../common/api_types";
/**
 * Validates the user and provides a JWT authentication token.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export async function greetController(req: Request, res: Response) {
    try {
        const params = getParameters<IApiGreetRequest>(req);
        return response(res).OK({
            hello: `Hello ${params.name || "John Doe"}! It is ${new Date()}`
        } as IApiGreetResponse);
    } catch (err) {
        return response(res).serverError(err);
    }
}
