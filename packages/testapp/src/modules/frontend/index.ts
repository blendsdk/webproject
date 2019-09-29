import { Application, getAuthenticatedUser, IRoute, Request, Response, response } from "@blendsdk/webafx";

export function FrontendModule(app: Application) {
    const routes: IRoute[] = [
        {
            method: "get",
            endpoint: "/",
            controller(_req: Request, res: Response) {
                res.render("../src/views/index.html.ejs");
            }
        },
        {
            method: "post",
            endpoint: "/api/credentials1s",
            controller(req: Request, res: Response) {
                const user = getAuthenticatedUser(req);
                return response(res).OK(user);
            }
        }
    ];
    app.addRoute(routes);
}
