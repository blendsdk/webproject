import { IRoute } from "@blendsdk/express";
import { LoginController } from "./controllers/LoginController";

const routes: IRoute[] = [
    {
        method: "post",
        endpoint: "/api/login",
        controller: LoginController,
        secure: false,
        parameters: {
            username: {
                type: "string"
            },
            password: {
                type: "string"
            },
            language: {
                optional: true,
                type: "string"
            }
        }
    }
    // {
    //     method: "get",
    //     endpoint: "/api/resource",
    //     parameters: {},
    //     controller: async (req: any, res: any) => {
    //         return res.send({ ok: true });
    //     },
    //     secure: true
    // }
];

export default routes;
