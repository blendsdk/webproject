import { buildRoutes } from "@blendsdk/express";
import { ICommonServices } from "@blendsdk/webapi-service";
import routes from "./routes";

export function initTokenAuthenticationModule(commonServices: ICommonServices, app: any) {
    buildRoutes(app, routes, commonServices);
}
