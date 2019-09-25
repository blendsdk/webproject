import { Application, IRoute, } from "@blendsdk/webafx"
import { Request, Response } from 'express'
import { response, getParameters } from '@blendsdk/express'

interface IGreetRequest {
    name: string;
}

interface IGreetResponse {
    result: string;
}

async function GreetController(_req: Request, _res: Response) {
    const { name } = getParameters<IGreetRequest>(_req);
    return response(_res).OK({ result: `Hello ${name}!` } as IGreetResponse)
}


export function testModule(app: Application) {

    const route: IRoute = {
        endpoint: "/greet/:name/hello",
        controller: GreetController,
        method:"get",
        authenticated:true,
        parameters: {
            name: {
                type:"string"
            }
        }
    }    
    app.addRoute(route);
}