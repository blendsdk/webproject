import express, { Application, NextFunction, Request, Response } from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import lusca = require("lusca");
import { loggerService, configService, initWebModules } from ".";
import { getParameters } from "@blendsdk/express";
import compression from "compression";
import bearerToken from "express-bearer-token";
import cors from "cors";
import helmet from "helmet";

/**
 * Initializes common express middlewares.
 *
 * @export
 * @param {Application} app
 */
export function initWebApplication(app: Application) {
    app.use(helmet());
    app.set("views", path.join(process.cwd(), "views"));
    app.set("view engine", "ejs");
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    app.use(bearerToken());
    app.use(
        cors(
            configService.getConfig().ACCESS_ORIGIN || {
                origin: ["http://localhost:3000"],
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                credentials: true
            }
        )
    );

    /**
     * Initializing the app modules
     */
    initWebModules(app);

    app.use(
        express.static(path.join(process.cwd(), "public"), {
            maxAge: configService.getConfig().STATIC_FILES_MAX_AGE || 31557600000
        })
    );

    /**
     * Print extra information when development mode.
     */
    if (process.env.NODE_ENV === "development") {
        app.use((req: Request, _res: Response, next: NextFunction) => {
            loggerService.debug("REQUEST", { params: { ...getParameters<any>(req) } });
            return next();
        });

        app._router.stack.map(e => {
            loggerService.info("EXPRESS_MODULES", { ...e });
        });
    }
}
