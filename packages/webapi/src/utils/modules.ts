import { Application } from "express";
import { commonServices } from "../utils/services";
import { initTokenAuthenticationModule } from "@blendsdk/webapi-token-auth";

export function initWebModules(app: Application) {
    initTokenAuthenticationModule(commonServices, app);
}
